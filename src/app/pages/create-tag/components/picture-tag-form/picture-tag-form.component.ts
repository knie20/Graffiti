// Angular Modules
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

// NativeScript Modules
import { Accuracy } from "tns-core-modules/ui/enums";

// NativeScript Plugins
import * as geolocation from "nativescript-geolocation";
const Firebase = require('nativescript-plugin-firebase/app');
import * as camera from "nativescript-camera";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router" ;

// Services
import { CreateTagService } from './../../services/create-tag-service';
import { NgModel } from "@angular/forms";
import { UserService } from "~/app/shared/user.service";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { ImageSource, fromAsset } from "tns-core-modules/image-source/image-source";

@Component({
    selector: "PictureTagForm",
    moduleId: module.id,
    templateUrl: "./picture-tag-form.component.html",
    styleUrls: ["./picture-tag-form.component.scss"]
})
export class PictureTagFormComponent implements OnInit, AfterViewInit {

    public saveToGallery: boolean = false;
    public allowsEditing: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number;
    public height: number;
    public cameraImage: ImageAsset;
    public actualWidth: number;
    public actualHeight: number;
    public scale: number = 1;
    public labelText: string;

    userPhotoUrl: string;
    photoUrl: string;
    photo: ImageSource;
    userId: string;
    tagText: string;

    constructor(
        private users: UserService,
        private tag: CreateTagService,
        private router: Router, 
        private routerExtensions: RouterExtensions) {
        const self: PictureTagFormComponent = this;
        users.getCurrentUser().then((user) => {
            
            self.userId = user.uid;

            users.getUserPhotoById(user.uid)
            .then(url => {
                self.userPhotoUrl = url;
            }).catch(err => {
                self.userPhotoUrl = `res://ic_hacker`;
            })
        })
    }

    onTakePictureTap = (event) => {
        
     }

    ngOnInit(): void {
        let that = this;
        camera.requestCameraPermissions().then(
            () => {
                camera.takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                    .then((imageAsset: any) => {
                        if(imageAsset.android) {
                            that.photoUrl = imageAsset.android;
                            fromAsset(imageAsset).then( img => {
                                that.photo = img;
                            });
                        }
                    }, (error) => {
                        console.log("Error: " + error);
                    });
            },
            () => {
                alert('permissions rejected')
                this.routerExtensions.back()
            }
        )
    }

    ngAfterViewInit(): void {}

    onPublish(): void {
        const self = this;
        geolocation
            .getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(value => {

                const latitude = value.latitude;
                const longitude = value.longitude;
                const position = Firebase.firestore().GeoPoint(latitude, longitude);
                
                const type = "photo"; //hardcoded for now

                const pictureTag = {
                    userId: self.userId, //hardcoded for now, until we implement authentication
                    postedOn: new Date(),
                    updatedOn: new Date(),
                    type: type,
                    text: self.tagText,
                    imageUrl: self.photoUrl,
                    videoUrl: null,
                    position: position
                };
        
                self.tag.createTag(self.userId, pictureTag, self.photo);
            })
    }
}