//Angular Modules
import { Injectable } from "@angular/core";

//NativeScript Plugins
const Firebase = require('nativescript-plugin-firebase/app');

//Interfaces
import { ITag } from '~/app/interfaces/tag';
import { ImageSource } from "tns-core-modules/image-source/image-source";
import { knownFolders, path, File } from "tns-core-modules/file-system/file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

@Injectable()
export class CreateTagService {

    storage = Firebase.storage().ref();

    uploadTagPhoto(id: string, photo: File): Promise<any> {
        return this.storage.child(`tagPhotos/${id}`).put(photo);
    }

    createTag(userId: string, tag: any, image = null) {

        const tagsCollection = Firebase.firestore().collection("tags");

        tagsCollection.add({
            createdBy: tag.userId,
            postedOn: tag.postedOn,
            updatedOn: tag.updatedOn || null,
            type: tag.type,
            text: tag.text || null,
            groupId: tag.groupId || null,
            imageUrl: tag.imageUrl || null,
            videoUrl: tag.videoUrl || null,
            position: tag.position,
            upVotes: 0,
            downVotes: 0,
            voters: []
        }).then(documentRef => {
            
            if(image){
                console.log(`About to upload image!!!`)
                const folderDest = knownFolders.documents();
                const pathDest = path.join(folderDest.path, "test.png");
                
                const saved = image.saveToFile(pathDest, "png");

                if(saved){
                    console.log(`It saved!`)
                    const imageFile: File = File.fromPath(pathDest);
                    
                    this.uploadTagPhoto(documentRef.id, imageFile).then(value => {
                        console.log(`Uploaded`)
                        
                        this.storage.child(`tagPhotos/${documentRef.id}`).getDownloadURL()
                            .then(url => {
                                
                                tagsCollection.doc(documentRef.id).update({
                                    imageUrl: url 
                                });

                            }).catch(err => {
                                console.log(`Something bad happened`);
                            });
    
                    });

                };
                
            }
        
        
        });
    }

}
