import { Observable } from 'rxjs';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tag-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnChanges, OnInit {

    @Input("tagId")
    private tagId: any;

    private comments$: Observable<Array<any>>;

    constructor(private tags: TagService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.tagId = changes['tagId'].currentValue;
        this.comments$ = this.tags.getObservableCommentsById(this.tagId);
    }

    ngOnInit(): void {

    }
}