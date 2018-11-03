import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

    fullName = "Andrew McEwen";
    username = "@mcewenal";
    signature = "Software developer, musician, vegetarian, husband, cat lover, purveyor of dad humor."
    accountAge: number;
    numTags = 289;
    numFollowing = 55;
    numFollowers = 15;
    activities = [
        {
            message: "You posted a tag."
        },
        {
            message: "You started following Kaidong Nie"
        },
        {
            message: "You friended Aaron Zorzi"
        }
    ];

    constructor() {
        this.accountAge = 128;
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
