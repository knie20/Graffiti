import { Observable } from "rxjs";
import { Injectable, NgZone } from '@angular/core';

const firebase = require("nativescript-plugin-firebase/app");
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class TagService {

    private comments;
    private comment;

    constructor(private zone: NgZone) {
        this.comments = [];
        this.comment = {};
    }

    getById(tagId): Promise<firestore.DocumentSnapshot> {
        const tagDocument = firebase.firestore().collection("tags").doc(tagId);
        return tagDocument.get();
    }

    getCommentsById(tagId): Promise<firestore.QuerySnapshot> {
        const commentsCollection = firebase.firestore().collection("tags").doc(tagId).collection("comments");
        return commentsCollection.get();
    }

    getObservableCommentsById(tagId: string): Observable<Array<any>> {

        return Observable.create((subscriber) => {
            const colRef: firestore.CollectionReference = firebase.firestore().collection("tags").doc(tagId).collection("comments");
            colRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    this.comments = [];
                    snapshot.forEach((docSnap) => {
                        this.comments.push({
                            id: docSnap.id,
                            ...docSnap.data()
                        })
                    });
                    subscriber.next(this.comments);
                });
            });
        });
    }

    getCommentById(tagId, commentId): Promise<firestore.DocumentSnapshot> {
        const commentDocument = firebase.firestore().collection("tags").doc(tagId).collection("comments").doc(commentId);
        return commentDocument.get();
    }

    getObservableCommentById(tagId: string, commentId: string): Observable<any> {

        return Observable.create((subscriber) => {
            const colRef: firestore.DocumentReference = firebase.firestore().collection("tags").doc(tagId).collection("comments").doc(commentId);
            
            colRef.onSnapshot((doc: firestore.DocumentSnapshot) => {
                this.zone.run(() => {
                    this.comment = {
                        id: doc.id,
                        ...doc.data()
                    };
                    
                    subscriber.next(this.comment);
                });
            });
        });

    }
}