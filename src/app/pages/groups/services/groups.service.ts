import { Injectable } from '@angular/core';

import { IGroup } from '~/app/interfaces/group';
import { GroupedObservable } from 'rxjs';

import { File } from "tns-core-modules/file-system";

import * as Firebase from "nativescript-plugin-firebase/app";
import { group } from '@angular/animations';
import { firestore } from 'nativescript-plugin-firebase';

@Injectable()
export class GroupsService {
    groupsCollection = Firebase.firestore().collection("groups");
    storage = Firebase.storage().ref();

    create(group: IGroup, groupPhoto: File) {
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
            this.uploadGroupPhoto(documentRef.id, groupPhoto)
        });

    }

    getGroupsByUserId(userId: string): Promise<firestore.QuerySnapshot> {
        const query = this.groupsCollection.where(`members`, `array-contains`, userId)
        return query.get()
    }

    getGroupById(id: string): Promise<firestore.DocumentSnapshot> {
        const group = this.groupsCollection.doc(id)
        return group.get()
    }

    getPhotoById(id: string): Promise<string> {
        return this.storage.child(`groupPhotos/${id}`).getDownloadURL();
    }

    uploadGroupPhoto(id: string, photo: File) {
        this.storage.child(`groupPhotos/${id}`).put(photo);
    }

    addMember(groupId: string, userId: string) {

    }

    getMembers(groupId: string): Promise<firestore.QuerySnapshot> {
        const members = this.groupsCollection.doc(groupId).collection("members")
        return members.get()
    }

    delete(groupId: string) {

    }

}