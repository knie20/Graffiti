//Angular Modules
import { Injectable } from "@angular/core";

//NativeScript Plugins
const Firebase = require('nativescript-plugin-firebase/app');

//Interfaces
import { ITag } from '~/app/interfaces/tag';

@Injectable()
export class CreateTagService {

    createTag(userId: string, tag: ITag) {
        console.log(`Creating tag...`);

        const tagsCollection = Firebase.firestore().collection("users").doc(userId).collection("tags");

        tagsCollection.add({
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
