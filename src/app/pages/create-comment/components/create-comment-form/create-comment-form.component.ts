// Angular Modules
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

// NativeScript Plugins
const Firebase = require('nativescript-plugin-firebase/app');

// Services
import { CreateCommentService } from './../../services/create-comment.service';
import { NgModel } from "@angular/forms";
import { UserService } from "~/app/shared/user.service";
import { Route, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-create-comment-form",
    moduleId: module.id,
    templateUrl: "./create-comment-form.component.html",
    styleUrls: ["./create-comment-form.component.scss"]
})
export class CreateCommentFormComponent implements OnInit, AfterViewInit {
    
    @ViewChild("commentTextInput") commentTextInput: any;

    userPhotoUrl: string;
    userId: string;
    commentText: string;
    tagId: string;

    constructor(
      private route: ActivatedRoute,
      private routerExtensions: RouterExtensions, 
      private users: UserService, 
      private comment: CreateCommentService
    ) {
        const self: CreateCommentFormComponent = this;
        users.getCurrentUser().then((user) => {
            
            this.tagId = this.route.snapshot.params['id'];
            self.userId = user.uid;

            users.getUserPhotoById(user.uid)
            .then(url => {
                self.userPhotoUrl = url;
            }).catch(err => {
                self.userPhotoUrl = `res://ic_hacker`;
            })
        })
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.commentTextInput.nativeElement.focus();
        }, 600);
    }

    onPublish(): void {
        const self: CreateCommentFormComponent = this;

        const comment = {
          createdBy: self.userId,
          tagId: this.tagId,
          text: this.commentText
      };

      this.comment.createComment(comment);
      this.routerExtensions.navigate([`/view-tag/id/${this.tagId}`]);
    }
}