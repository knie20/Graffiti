import { Injectable, OnInit } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");

import { ISettings } from '~/app/interfaces/settings';

import * as Firebase from "nativescript-plugin-firebase/app";

@Injectable()
export class SettingsService implements OnInit {

    userId: string
    userSettings: ISettings;
    usersCollection: any;

    constructor() {

    }

    ngOnInit(): void {
        this.userId = Firebase.auth().currentUser.uid;
        this.usersCollection = Firebase.firestore().collection("users").doc(this.userId);
    }

    getSettings(): ISettings {
        this.usersCollection
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(`Relatively small Californian city: ${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            });

        let settings = {
            userId: "username",
            enableGeolocation: true,
            enableNotifications: true,
        };

        return settings;
    }

    updateSettings(settings: ISettings) {
        //Update the user's settings in firebase
    }
}
