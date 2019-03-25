import { AfterContentChecked, AfterViewChecked } from '@angular/core';
import { UserService } from '~/app/shared/user.service';
import { AfterViewInit, AfterContentInit, SimpleChanges, OnChanges, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../../../../shared/tag.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, AfterViewChecked {

    tag: any;

    @Input("input") input: any;

    @Input("tagId") tagId: any;

    private taggerId: string;
    private taggerDisplayName: string;
    private taggerHandle: string;
    private taggerPhotoURL: string;

    constructor(private users: UserService, private tags: TagService) {

    }

    ngOnInit(): void {

        this.tags.getById(this.tagId).then(doc => {
            let tagObject = {
              id: doc.id,
              ...doc.data()
            }
            
            this.tag = tagObject;

            this.users.getById(this.tag.createdBy).then(user => {
                let userData = user.data();
                this.taggerDisplayName = userData.displayName;
                this.taggerHandle = userData.handle;
                this.taggerPhotoURL = userData.photoURL;
            });
        });
    }

    ngAfterViewChecked(): void {

    }
}