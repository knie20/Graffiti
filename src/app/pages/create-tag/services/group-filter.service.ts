import { UserService } from './../../../shared/user.service';
import { Injectable, OnInit } from '@angular/core';

import * as Firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class GroupFilterService implements OnInit {

    private userId: string;
    private groupsCollection: any;
    private query: any;

    constructor(){

    }

    ngOnInit(): void {

    }

    getGroupsForModal(userId): Promise<firestore.QuerySnapshot> {
        const query: firestore.Query = Firebase.firestore().collection("groups")
            .where(`members`, `array-contains`, userId);

        return query.get();
    }
}