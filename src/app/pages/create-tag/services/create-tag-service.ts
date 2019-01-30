import { Injectable } from "@angular/core";
import { ITag } from '~/app/interfaces/tag';
const Firebase = require('nativescript-plugin-firebase/app');

@Injectable()
export class CreateTagService {

    tagsCollection = Firebase.firestore().collection("tags");

    createTag(tag: ITag) {

        console.log(`Creating tag...`);
        this.tagsCollection.add({
            userId: tag.userId,
            postedOn: tag.postedOn,
            updatedOn: tag.updatedOn || null,
            type: tag.type,
            text: tag.text || null,
            imageUrl: tag.imageUrl || null,
            videoUrl: tag.videoUrl || null,
            position: tag.position
        }).then(documentRef => {
            console.log(`Tag added with auto-generated ID: ${documentRef.id}`);
        });
    }

}
