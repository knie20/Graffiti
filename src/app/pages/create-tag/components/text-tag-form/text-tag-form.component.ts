// Angular Modules
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewContainerRef } from "@angular/core";

// NativeScript Modules
import { Accuracy } from "tns-core-modules/ui/enums";

// NativeScript Plugins
import * as geolocation from "nativescript-geolocation";
const Firebase = require('nativescript-plugin-firebase/app');

// Services
import { CreateTagService } from './../../services/create-tag-service';
import { NgModel } from "@angular/forms";
import { UserService } from "~/app/shared/user.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GroupFilterModalComponent } from "../group-filter-modal/group-filter-modal.component";

@Component({
    selector: "TextTagForm",
    moduleId: module.id,
    templateUrl: "./text-tag-form.component.html",
    styleUrls: ["./text-tag-form.component.scss"]
})
export class TextTagFormComponent implements OnInit, AfterViewInit {
    
    @ViewChild("tagTextInput") tagTextInput: any;

    userPhotoUrl: string;
    userId: string;
    tagText: string;
    tagGroup: any;

    constructor(
        private users: UserService, 
        private tag: CreateTagService, 
        private modalService: ModalDialogService, 
        private viewContainerRef: ViewContainerRef
    ) {
        const self: TextTagFormComponent = this;
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

    ngOnInit(): void {
        geolocation.enableLocationRequest();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.tagTextInput.nativeElement.focus();
        }, 600);
    }

    onFilterButtonTap() {

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
        };

        this.modalService.showModal(GroupFilterModalComponent, options).then(filterValue => {
            this.tagGroup = filterValue;
            console.log(`Tag group: `, this.tagGroup);
        });

        setTimeout(() => {
            this.tagTextInput.nativeElement.dismissSoftInput();
            this.tagTextInput.nativeElement.focus();
        }, 600);
    }

    onPublish(): void {
        const self: TextTagFormComponent = this;
         geolocation
            .getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(value => {

                const latitude = value.latitude;
                const longitude = value.longitude;
                const position = Firebase.firestore().GeoPoint(latitude, longitude);
                
                const type = "text"; //hardcoded for now

                const textTag = {
                    userId: self.userId, //hardcoded for now, until we implement authentication
                    groupId: this.tagGroup.id || null,
                    postedOn: new Date(),
                    updatedOn: new Date(),
                    type: type,
                    text: this.tagText,
                    imageUrl: null,
                    videoUrl: null,
                    position: position
                };
        
                console.log(textTag);
                //this.tag.createTag(this.userId, textTag);
            })
    }
}