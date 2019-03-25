import { UserService } from '~/app/shared/user.service';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges, OnInit, ChangeDetectionStrategy, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { firestore } from "nativescript-plugin-firebase";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    @Input()
    tagId: string;

    @Input()
    comment: any;

    private commenterDisplayName: string;
    private commenterHandle: string;
    private commenterPhotoURL: string;

    constructor(private tags: TagService, private users: UserService) {

    }

    ngOnInit(): void {
        
        this.users.getById(this.comment.createdBy).then(user => {
            const userData = user.data();
            this.commenterDisplayName = userData.displayName;
            this.commenterHandle = userData.handle;
            this.commenterPhotoURL = userData.photoURL;
        });
    }

}