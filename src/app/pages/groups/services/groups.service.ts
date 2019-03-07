import { Injectable } from '@angular/core';

import { IGroup } from '~/app/interfaces/group';
import { GroupedObservable } from 'rxjs';

import { File } from "tns-core-modules/file-system";

import * as Firebase from "nativescript-plugin-firebase/app";
import { group } from '@angular/animations';

@Injectable()
export class GroupsService {
    groupsCollection = Firebase.firestore().collection("groups");
    storage = Firebase.storage().ref();

    create(group: IGroup, groupPhoto: File) {
        console.log(`Creating group...`);

        this.groupsCollection.add({
            name: group.name,
            organization: group.organization,
            description: group.description,
            location: group.location,
            members: group.members,
            isPublic: group.isPublic,
            createdBy: group.createdBy,
            createdOn: group.createdOn
        }).then(documentRef => {
            console.log(`Group added with auto-generated ID: ${documentRef.id}`);
            this.uploadGroupPhoto(documentRef.id, groupPhoto)
        });

    }

    getGroupsByUserId(userId: string): IGroup[] {
        const groups = []

        const query = this.groupsCollection
            .where("createdBy", "==", userId)

        query
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    //console.log(`Group by user ID: ${doc.id} => ${JSON.stringify(doc.data())}`);

                    this.storage.child(`groupPhotos/${doc.id}`).getDownloadURL().then((url)=>{
                        const groupObject = {
                            id: doc.id,
                            name: doc.data()[`name`],
                            photo: url,
                            members: doc.data()[`members`]
                        }
                        groups.push(groupObject);
                    });

                });
            });
            
        return groups;
    }

    getGroupById(name: string): IGroup {
        let groups = [];

        const query = this.groupsCollection
            .where("name", "==", name)

        query
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    //console.log(`Group by id: ${doc.id} => ${JSON.stringify(doc.data())}`);

                    this.storage.child(`groupPhotos/${doc.id}`).getDownloadURL().then((url)=>{
                        const groupObject = {
                            id: doc.id,
                            name: doc.data()[`name`],
                            photo: url,
                            members: doc.data()[`members`]
                        }
                        groups.push(groupObject);
                    });

                });
            });
            
        return groups[0];

    }

    uploadGroupPhoto(id: string, photo: File) {
        this.storage.child(`groupPhotos/${id}`).put(photo).then(upload =>{
            upload
        });
    }

    addMember(groupId: string, userId: string) {

    }

    getMembers(groupId: string): string[] {
        const members = [``];
        return members;
    }

    delete(groupId: string) {

    }

}