// NativeScript modules
import * as app from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";

// Angular modules
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

//NativeScript plugins
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

const firebase = require("nativescript-plugin-firebase");

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "ns-app",
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

    constructor(
        private router: Router, 
        private routerExtensions: RouterExtensions, 
        private ngZone: NgZone, 
        private users: UserService,
        private auth: AuthService 
    ) { 
        //Initialize things
    }

    async ngOnInit(): Promise<void> {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.

        try {
            await firebase.init({
                storageBucket: "gs://ucitsd-graffiti-1.appspot.com",
                
                onAuthStateChanged: (data) => {

                    if (data.loggedIn) {
                        console.log("Logged in to firebase");

                        console.log("Current user:" + JSON.stringify(data.user));

                        this.currentUser = data.user;
                        this.userEmail = data.user.email;
                        
                        //Get the current user's display name
                        this.users.getCurrentUser().then(user => {

                            this.userEmail = user.email;
                
                            this.users.getById(user.uid)
                                .then((document) => {
                                    const data = document.data()
                                    this.userDisplayName = data.displayName;
                                })
                                .catch((err) => {
                                    console.log("firestoreWhereUserHasId failed, error: " + err)
                                });

                        
                            this.users.getUserPhotoById(user.uid)
                                .then(url => {
                                    console.log(url)
                                    this.userPhotoUrl = url;
                                }).catch(err => {
                                    this.userPhotoUrl = `res://ic_hacker`;
                                })
                        })

                        this.ngZone.run(()=>{
                            this.routerExtensions.navigate([`/map`], { clearHistory: true });
                        })

                    } else {
                        this.ngZone.run(()=>{
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
        if(navItemRoute == `/profile`){
            this.routerExtensions.navigate([`/profile/id/${this.currentUser.uid}`]);
        } else {
            this.routerExtensions.navigate([navItemRoute]);
        }
        
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    logout(){
        this.auth.logout();
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }
}
