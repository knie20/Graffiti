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
        this.comment = {};
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.tagId = changes['tagId'].currentValue;
        this.commentId = changes['commentId'].currentValue;

        console.log(`Tag ID on change`, this.tagId);
        console.log(`Comment ID on change: `, this.commentId);

        this.comment$ = this.tags.getObservableCommentById(this.tagId, this.commentId);

        this.comment$.subscribe(comment => {
            console.log(`Subcribed comment: `, comment);
            this.comment = comment;
        });

/*         this.users.getById(this.comment.createdBy).then(user => {
            const userData = user.data()
            this.commenterDisplayName = userData.displayName;
            this.commenterHandle = userData.handle;
            this.commenterPhotoURL = userData.photoURL;
        }); */
    }

}