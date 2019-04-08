import { UserService } from './../../../shared/user.service';
import { Injectable, OnInit } from '@angular/core';

import * as Firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class MapFilterService implements OnInit {

    private userId: string;
    private groupsCollection: any;
    private query: any;

    constructor(){

    }

    ngOnInit(): void {

    }

    getGroupsForModal(userId): Promise<firestore.QuerySnapshot> {
        console.log(`USER ID FINALLY `, userId);
        const query: firestore.Query = Firebase.firestore().collection("groups")
            .where(`members`, `array-contains`, `WNjIxaWDQYNgXqotGz4AfyVFzGF2`);

        return query.get();
    }
}