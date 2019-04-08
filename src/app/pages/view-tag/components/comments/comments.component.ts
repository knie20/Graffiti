import { AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagService } from '~/app/shared/tag.service';
import { Component, Input, SimpleChanges, OnChanges, OnInit, ChangeDetectionStrategy, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase";

@Component({
    selector: 'app-tag-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnChanges, OnInit {

    @Input("tagId")
    private tagId: any;

    private comments: any[];

    constructor(private tags: TagService) {
        this.comments = [];
    }

    ngOnInit(): void {
        console.log(`Tag ID on init comments: `, this.tagId);
        
        this.tags.getComments(this.tagId).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const commentObject = {
                    id: doc.id,
                    ...doc.data()
                }
                console.log(`Pushing a comment...`)
                this.comments.push(commentObject);
            });
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        //let tagId = changes["tagId"].currentValue;
    }

}