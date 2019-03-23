import { Injectable } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");

import { ISettings } from '~/app/interfaces/settings';

@Injectable()
export class SettingsService {

    getSettings(): ISettings {
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
