// Angular Modules
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

// NativeScript Modules
import { Accuracy } from "tns-core-modules/ui/enums";

// NativeScript Plugins
import * as geolocation from "nativescript-geolocation";
const Firebase = require('nativescript-plugin-firebase/app');

// Services
import { CreateTagService } from './../../services/create-tag-service';
import { NgModel } from "@angular/forms";

@Component({
    selector: "TextTagForm",
    moduleId: module.id,
    templateUrl: "./text-tag-form.component.html",
    styleUrls: ["./text-tag-form.component.scss"]
})
export class TextTagFormComponent implements OnInit, AfterViewInit {
    
    @ViewChild("tagTextInput") tagTextInput: any;

    tagText: string;

    constructor(private tag: CreateTagService) {

    }

    ngOnInit(): void {
        geolocation.enableLocationRequest();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.tagTextInput.nativeElement.focus();
        }, 600);
    }

    onPublish(): void {
        const textTag = {
            id: 2,
            text: `Hello world!`
        };

         geolocation
            .getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(value => {

                const latitude = value.latitude;
                const longitude = value.longitude;
                const position = Firebase.firestore().GeoPoint(latitude, longitude);
                
                const type = "Test Tag"; //hardcoded for now

                const textTag = {
                    userId: 12345678, //hardcoded for now, until we implement authentication
                    postedOn: new Date(),
                    updatedOn: new Date(),
                    type: type,
                    text: this.tagText,
                    imageUrl: null,
                    videoUrl: null,
                    position: position
                };
        
                this.tag.createTag(textTag);
            })
    }
}