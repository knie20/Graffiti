import { UserService } from '~/app/shared/user.service';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnChanges, OnInit {

    @Input()
    private tagId: string;

    @Input()
    private commentId: string;

    private comment: any;
    private comment$: Observable<any>;

    private commenterDisplayName: string;
    private commenterHandle: string;
    private commenterPhotoURL: string;

    constructor(private tags: TagService, private users: UserService) {
        this.comment = {
            text: ``,
            displayName: ``,
            createdBy: ``
        };
    }

    ngOnInit(): void {

    }

    ngOnChanges(): void {

        this.comment$ = this.tags.getObservableCommentById(this.tagId, this.commentId);
        this.comment$.subscribe(comment => {

            console.log(`Comment here: `, comment);
            this.comment = {
                id: comment.id,
                text: comment.text,
                createdBy: comment.createdBy
            };

            this.users.getById(this.comment.createdBy).then(user => {
                console.log(`Comment user: `, user.data())
                const userData = user.data()
                this.commenterDisplayName = userData.displayName;
                this.commenterHandle = userData.handle;
                this.commenterPhotoURL = userData.photoURL;
            });
        });
    }

}