import { Observable } from "rxjs";
import { Injectable, NgZone } from '@angular/core';

const firebase = require("nativescript-plugin-firebase/app");
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class TagService {

    constructor(private zone: NgZone) {

    }

    getById(tagId): Promise<firestore.DocumentSnapshot> {
        const tagDocument = firebase.firestore().collection("tags").doc(tagId);
        return tagDocument.get();
    }

    getComments(tagId): Promise<firestore.QuerySnapshot> {
        const query: firestore.Query = firebase.firestore().collection("comments")
            .where("tagId", "==", tagId);
    
        return query.get();
    }

    getCommentById(commentId): Promise<firestore.DocumentSnapshot> {
        const commentDocument = firebase.firestore().collection("comments").doc(commentId);
        return commentDocument.get();
    }

}