import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { messaging, Message } from 'nativescript-plugin-firebase/messaging';

import * as applicationSettings from "tns-core-modules/application-settings";
import { alert, confirm } from "tns-core-modules/ui/dialogs";
import { FirebaseTrace } from 'nativescript-plugin-firebase/performance/performance';

const getCircularReplacer = () => {
    const seen = new WeakSet;
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

@Injectable()
export class MessagingService {

    private static APP_REGISTERED_FOR_NOTIFICATIONS = "APP_REGISTERED_FOR_NOTIFICATIONS";
    private serverUrl = "https://fcm.googleapis.com/fcm/send";

    constructor(private http: HttpClient) {
        console.log(`Checking if registered for notifications!`);
        if (applicationSettings.getBoolean(MessagingService.APP_REGISTERED_FOR_NOTIFICATIONS, false)) {
            console.log(`Not registered for push notificiations`);
            this.doRegisterPushHandlers();
        }

        if (applicationSettings.getBoolean(MessagingService.APP_REGISTERED_FOR_NOTIFICATIONS, true)) {
            console.log(`Already registered for push notificiations`);
        }
    }

    postData(data: any) {
        console.log(`Posting a notification!!! Yee yee`);

        let options = this.createRequestOptions();

        let notificationData = data;

        console.log(notificationData);

        return this.http.post(this.serverUrl, notificationData , { headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Authorization": "key=AIzaSyDHncXcIFOkX5v7Auh4f9klB1v1H9RJH24",
            "Content-Type": "application/json"
        });
        return headers;
    }

    public doRequestConsent(): void {
        console.log(`Doing the request consent thing!`);
        confirm({
            title: "We'd like to send notifications",
            message: "Do you agree? Please do, we won't spam you. Promised.",
            okButtonText: "Yep!",
            cancelButtonText: "Maybe later"
        }).then(pushAllowed => {
            if (pushAllowed) {
                applicationSettings.setBoolean(MessagingService.APP_REGISTERED_FOR_NOTIFICATIONS, true);
                this.doRegisterForPushNotifications();
            } else {
                console.log(`Pushing is not allowed around here!`);
            }
        });
    }

    // You could add these handlers in 'init', but if you want you can do it seperately as well.
    // The benefit being your user will not be confronted with the "Allow notifications" consent popup when 'init' runs.
    public doRegisterPushHandlers(): void {

        console.log(`Doing register push handlers...`);

        // note that this will implicitly register for push notifications, so there's no need to call 'registerForPushNotifications'
        messaging.addOnPushTokenReceivedCallback((token) => {
            console.log("Firebase plugin received a push token: " + token);
        }
        );

        messaging.addOnMessageReceivedCallback(
            message => {
                console.log("Push message received in push-view-model: " + JSON.stringify(message, getCircularReplacer()));

                setTimeout(() => {
                    alert({
                        title: "Push message!",
                        message: (message !== undefined && message.title !== undefined ? message.title : ""),
                        okButtonText: "Sw33t"
                    });
                }, 500);
            }
        ).then(() => {
            console.log("Added addOnMessageReceivedCallback");
            try {
                console.log(`Getting current push token...`)
                this.doGetCurrentPushToken();
            } catch (error) {
                console.log(error);
            }
        }, err => {
            console.log("Failed to add addOnMessageReceivedCallback: " + err);
        });
    }

    public doRegisterForPushNotifications(): void {
        messaging.registerForPushNotifications({

            onPushTokenReceivedCallback: (token: string): void => {
                console.log("Firebase plugin received a push token: " + token);
            },

            onMessageReceivedCallback: (message: Message) => {
                console.log("Push message received in push-view-model: " + JSON.stringify(message, getCircularReplacer()));

                setTimeout(() => {
                    alert({
                        title: "Hello from Graffiti!",
                        message: (message !== undefined && message.title !== undefined ? message.title : ""),
                        okButtonText: "Good to know"
                    });
                }, 500);
            },

            // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
            showNotifications: true,

            // Whether you want this plugin to always handle the notifications when the app is in foreground.
            // Currently used on iOS only. Default false.
            // When false, you can still force showing it when the app is in the foreground by adding 'showWhenInForeground' to the notification as mentioned in the readme.
            showNotificationsWhenInForeground: false
        })
            .then(() => {
                console.log("Registered for push");
                this.doGetCurrentPushToken();
            })
            .catch(err => {
                console.log(err);
            });
    }

    public doUnregisterForPushNotifications(): void {
        messaging.unregisterForPushNotifications().then(
            () => {
                alert({
                    title: "Unregistered",
                    message: "If you were registered, that is.",
                    okButtonText: "Got it, thanks!"
                });
            });
    }

    public doGetAreNotificationsEnabled(): void {
        alert({
            title: "AreNotificationsEnabled",
            message: "" + messaging.areNotificationsEnabled(),
            okButtonText: "Okay, very interesting"
        });
    }

    public doGetCurrentPushToken(): Promise<string> {
        return messaging.getCurrentPushToken();
    }

}