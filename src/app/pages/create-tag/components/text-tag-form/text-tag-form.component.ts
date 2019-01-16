import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { CreateTagService } from './../../services/create-tag-service';
import { Position } from 'nativescript-google-maps-sdk';

@Component({
    selector: "TextTagForm",
    moduleId: module.id,
    templateUrl: "./text-tag-form.component.html",
    styleUrls: ["./text-tag-form.component.scss"]
})
export class TextTagFormComponent implements OnInit, AfterViewInit {
    
    @ViewChild("textTagInput") textTagInput: ElementRef;

    constructor(private tag: CreateTagService) {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.textTagInput.nativeElement.focus();
        }, 600);
    }

    onPublish(): void {
        const textTag = {
            id: 2,
            text: `Hello world!`
        };

        this.tag.createTextTag(textTag);
    }
}