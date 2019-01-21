import { Injectable } from "@angular/core";
import { ITag } from '~/app/interfaces/tag.interfaces';
const Firebase = require('nativescript-plugin-firebase/app');

@Injectable()
export class CreateTagService {

    tagsCollection = Firebase.firestore().collection("tags");

    createTextTag(tag: ITag) {

        this.tagsCollection.add({
            id: 4,
            text: `Hello world once again!`
        }).then(documentRef => {
            console.log(`Tag added with auto-generated ID: ${documentRef.id}`);
        });
    }

}
