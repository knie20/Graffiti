import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { CreateTagService } from './../../services/create-tag-service';

const Firebase = require('nativescript-plugin-firebase/app');

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Position } from 'nativescript-google-maps-sdk';

@Component({
    selector: "TextTagForm",
    moduleId: module.id,
    templateUrl: "./text-tag-form.component.html",
    styleUrls: ["./text-tag-form.component.scss"]
})
export class TextTagFormComponent implements OnInit, AfterViewInit {
    
    @ViewChild("tagTextInput") tagTextInput: any;

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

        geolocation
            .getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(value => {

                const latitude = value.latitude;
                const longitude = value.longitude;
                const position = Firebase.firestore().GeoPoint(latitude, longitude);
                
                const type = "Test Tag"; //hardcoded for now
                const text = this.tagTextInput.nativeElement.value;

                const textTag = {
                    userId: 12345678, //hardcoded for now, until we implement authentication
                    postedOn: new Date(),
                    updatedOn: new Date(),
                    type: type,
                    text: text,
                    imageUrl: null,
                    videoUrl: null,
                    position: position
                };
        
                this.tag.createTag(textTag);
            })
    }
}