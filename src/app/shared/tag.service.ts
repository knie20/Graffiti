import { Observable } from 'rxjs';
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

    getCommentsById(tagId): Promise<firestore.QuerySnapshot> {
        const commentsCollection = firebase.firestore().collection("tags").doc(tagId).collection("comments");
        return commentsCollection.get();
    }

    getObservableCommentsById(tagId): Observable<Array<any>> {
        return Observable.create((subscriber) => {

            const colRef: firestore.CollectionReference = firebase.firestore().collection("tags").doc(tagId).collection("comments");

            console.log(`Colfre: `, colRef)
            colRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.zone.run(()=> {
                    
                    let comments = [];                
                    
                    snapshot.forEach((docSnap) => {
                        let commentObject = { id: docSnap.id, ...docSnap.data() };
                        comments.push(commentObject);
                    });

                    subscriber.next(comments);
                })
            });
        });
    }

    getCommentById(tagId, commentId): Promise<firestore.DocumentSnapshot> {
        const commentDocument = firebase.firestore().collection("tags").doc(tagId).collection("comments").doc(commentId);
        return commentDocument.get();
    }
}