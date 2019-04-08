import { MessagingService } from './shared/messaging.service';
// NativeScript modules
import * as app from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";

// Angular modules
import { Component, OnInit, NgZone, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

//NativeScript plugins
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

const firebaseApp = require("nativescript-plugin-firebase");
import * as firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase";


import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

    public theme: string;

    private _activatedUrl: string;
    private currentUser: any;
    private currentUsers: any;
    private userName: string;
    private userDisplayName: string;
    private userEmail: string;
    private userPhotoUrl: string;
    private userFollowers;
    private unsubscribe;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private ngZone: NgZone,
        private users: UserService,
        private auth: AuthService,
        private messaging: MessagingService
    ) {
        //Initialize things
    }

    async ngOnInit(): Promise<void> {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.

        try {
            await firebaseApp.init({
                storageBucket: "gs://ucitsd-graffiti-1.appspot.com",

                onAuthStateChanged: (data) => {

                    if (data.loggedIn) {
                        console.log("Logged in to firebase");

                        console.log("Current user:" + JSON.stringify(data.user));

                        this.currentUser = data.user;
                        this.userEmail = data.user.email;

                        //Get the current user's display name
                        this.users.getCurrentUser().then(user => {

                            this.userFollowers = firebase.firestore().collection("users").doc(user.uid).collection("followers");

                            this.userFollowers.onSnapshot((doc: firestore.QuerySnapshot) => {

                                const modifiedDocs = doc.docChanges();

                                modifiedDocs.forEach(doc => {
                                    
                                    if (doc.type == "modified") {
                                        const displayName = doc.doc.data().displayName;
                                        const photoURL = doc.doc.data().photoURL;

                                        this.messaging.doGetCurrentPushToken()
                                            .then(token => {
                                                console.log(`Current push token: `, token);
                                                this.onFollowerAdded(token, doc.doc.data());
                                            })
                                            .catch((err) => {
                                                console.log("Error in doGetCurrentPushToken: " + err)
                                            });
                                    }
                                })
                            }

                            );

                            this.userEmail = user.email;

                            this.users.getById(user.uid)
                                .then((document) => {
                                    const data = document.data()
                                    this.userDisplayName = data.displayName;
                                    this.userPhotoUrl = data.photoURL;
                                })
                                .catch((err) => {
                                    console.log("firestore Where User Has Id failed, error: " + err)
                                });
                        })

                        this.ngZone.run(() => {
                            this.routerExtensions.navigate([`/map`], { clearHistory: true });
                        })

                    } else {
                        this.ngZone.run(() => {
                            this.routerExtensions.navigate([`/login`], { clearHistory: true });
                        })
                    }
                }
            });


        } catch (error) {
            console.log(error);
        }
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        if (navItemRoute == `/profile`) {
            this.routerExtensions.navigate([`/profile/id/${this.currentUser.uid}`]);
        } else {
            this.routerExtensions.navigate([navItemRoute]);
        }

        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    onFollowerAdded(token: string, follower: any) {

        console.log(`Just added ${follower.displayName}`);
        const notification = {
            "notification": {
                "title": `${follower.displayName} started following you!`,
                "text": `Hello world!`,
                "badge": "1",
                "sound": "default"

            },
            "data": {
                "foo": "bar"
            },
            "priority": "High",
            "to": token
        };

        this.messaging.postData(notification).subscribe(res => {
            console.log(res);
        });
    }

    logout() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        this.auth.logout();
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }
}
