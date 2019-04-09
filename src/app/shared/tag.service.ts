import { Observable } from "rxjs";
import { Injectable, NgZone } from '@angular/core';

const firebase = require("nativescript-plugin-firebase/app");
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class TagService {

    private comment;
    
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

    upvoteTag(tagId: string, currentUpvotes: number, userId: string): void {
        const tagDocument: firestore.DocumentReference = firebase.firestore().collection("tags").doc(tagId)
        tagDocument.update({
            upVotes: currentUpvotes + 1,
            voters: firestore.FieldValue.arrayUnion(userId)
        })
    }

    downvoteTag(tagId: string, currentDownvotes: number, userId: string): void {
        const tagDocument: firestore.DocumentReference = firebase.firestore().collection("tags").doc(tagId)
        tagDocument.update({
            upVotes: currentDownvotes + 1,
            voters: firestore.FieldValue.arrayUnion(userId)
        })
    }
}