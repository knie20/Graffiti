import { Observable } from 'rxjs';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tag-comments',
    templateUrl: './comments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnChanges, OnInit {

    @Input("tagId")
    private tagId: any;

    private comments: string[];
    private comments$: Observable<Array<any>>;

    constructor(private tags: TagService) {
        this.comments = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.tagId = changes['tagId'].currentValue;

/*         this.tags.getCommentsById(this.tagId).then(snapshot => {
            let comments = [];

            snapshot.forEach(comment => {
                let commentData = comment.data();
                let commentObject = {id: comment.id, ...commentData }
                comments.push(commentObject);
            });

            this.comments = comments;
        }); */

        this.comments$ = this.tags.getObservableCommentsById(this.tagId);
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
}