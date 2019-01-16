import { Injectable } from "@angular/core";
import { ITag } from '~/app/interfaces/tag.interfaces';
const Firebase = require('nativescript-plugin-firebase/app');

@Injectable()
export class CreateTagService {
    
    tagsCollection = Firebase.firestore().collection("tags");

    createTextTag(tag: ITag) {
        console.log(`Posting text tag...`);

        this.tagsCollection.add({
            id: 2,
            text: `Hello world!`
          }).then(documentRef => {
            console.log(`Tag added with auto-generated ID: ${documentRef.id}`);
          });

        console.log(`Posted text tag!`);
    }

}
