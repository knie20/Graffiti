import { UserService } from './../../../../shared/user.service';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnChanges {

    @Input()
    private tagId: string;

    @Input()
    private commentId: string;

    private comment: any;

    private commenterDisplayName: string;
    private commenterHandle: string;
    private commenterPhotoURL: string;

    constructor(private tags: TagService, private users: UserService) {
        this.comment = {};
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.tagId = changes['tagId'].currentValue;
        this.commentId = changes['commentId'].currentValue;

        //Get the comment by its ID
        this.tags.getCommentById(this.tagId, this.commentId).then(comment => {
            let commentData = comment.data();
            let commentObject = { id: comment.id, ...commentData };
            this.comment = commentObject;

            //Get the user who created the comment
            this.users.getById(this.comment.createdBy).then(user => {
                const userData = user.data()
                this.commenterDisplayName = userData.displayName;
                this.commenterHandle = userData.handle;
                this.commenterPhotoURL = userData.photoURL;
            })

        });

    }

}