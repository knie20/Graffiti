import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { alert } from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";

@Component({
    selector: "Profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;


    fullName = "Andrew McEwen";
    username = "@mcewenal";
    signature = "Software developer, musician, vegetarian, husband, cat daddy, lifelong noob."
    accountAge: number;
    numTags = 289;
    numFollowing = 158;
    numFollowers = 47;
    activities = [
        {
            message: "You posted a tag."
        },
        {
            message: "You started following Kaidong Nie"
        },
        {
            message: "You are now friends with Kaidong Nie"
        }
    ];

    constructor() {
        this.tabSelectedIndex = 0;
        this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";

        this.accountAge = 128;
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }

    // displaying the old and new TabView selectedIndex
    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            if (newIndex === 0) {
                this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
            } else if (newIndex === 1) {
                this.tabSelectedIndexResult = "Stats Tab (tabSelectedIndex = 1 )";
            } else if (newIndex === 2) {
                this.tabSelectedIndexResult = "Settings Tab (tabSelectedIndex = 2 )";
            }
            alert(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`)
                .then(() => {
                    console.log("Dialog closed!");
                });
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
