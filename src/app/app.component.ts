// NativeScript modules
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";

// Angular modules
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

//NativeScript plugins
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

    private _activatedUrl: string;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private ngZone: NgZone) { }

    ngOnInit(): void {

        //This setTimeout fixes the 'JS: Error: Uncaught (in promise): Run init() first!' error.
        setTimeout(() => {
            firebase.init({
                storageBucket: "gs://ucitsd-graffiti-1.appspot.com",
                onAuthStateChanged: (data) => {
                    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                    if (data.loggedIn) {
                        console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                        this.routerExtensions.navigate([`/map`], { clearHistory: true});
                    } else {
                        this.ngZone.run(()=>{
                            this.routerExtensions.navigate([`/login`], { clearHistory: true });
                        })
                    }
                }
            }).then(
                () => {
                    console.log("firebase.init successfull");
                },
                error => {
                    console.log(`firebase.init error: ${error}`);
                }
            );
        }, 1000);

    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute]);
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    logout(){
        firebase.logout();
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }
}
