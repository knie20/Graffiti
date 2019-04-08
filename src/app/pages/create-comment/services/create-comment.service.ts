import { Injectable } from '@angular/core';

const Firebase = require('nativescript-plugin-firebase/app');

@Injectable()
export class CreateCommentService {
 
    createComment(comment){
        const commentsCollection = Firebase.firestore().collection("comments");

        commentsCollection.add({
            createdBy: comment.createdBy,
            tagId: comment.tagId,
            text: comment.text
        });
    }
}