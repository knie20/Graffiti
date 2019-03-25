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
export class TagComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {

    @Input("tag")
    private tag: any;

    @Output("tagId")
    private tagId: any;

    private tagData: any;

    private taggerDisplayName: string;
    private taggerHandle: string;
    private taggerPhotoURL; string;

    constructor(private users: UserService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.tag = changes['tag'].currentValue;
        this.tagId = this.tag.id;

        this.users.getById(this.tag.createdBy).then(user => {
            let userData = user.data();
            this.taggerDisplayName = userData.displayName;
            this.taggerHandle = userData.handle;
            this.taggerPhotoURL = userData.photoURL;
        })
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
    }

    ngAfterContentInit(): void {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
    }

    upvote(): void {
        
        this.users.getCurrentUser().then(user => {
            if(this.tag.voters.includes(user.uid)){
                this.tagService.upvoteTag(this.tagId, this.tag.upVotes, user.uid)
                this.tag.upVotes += 1
            }
        })
    }

    downvote(): void {
        this.users.getCurrentUser().then(user => {
            if(this.tag.voters.includes(user.uid)){
                this.tagService.downvoteTag(this.tagId, this.tag.downVotes, user.uid)
                this.tag.DownVotes += 1
            }
        })
    }
}