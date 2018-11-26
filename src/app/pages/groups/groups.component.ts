import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

//CardView setup
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

@Component({
    selector: "Groups",
    moduleId: module.id,
    templateUrl: "./groups.component.html",
    styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {

    groups = [
        {
            groupName: "Team Graffiti",
            members: 48,
            icon: "res://ic_spray_white_24dp"
        },
        {
            groupName: "CECH",
            members: 221,
            icon: "https://pbs.twimg.com/profile_images/2185041905/CECH-social-WH_400x400.png"
        },
        {
            groupName: "AcceleratedIT",
            members: 41,
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYG7OXuBYEy0uQidTQR_s0j5rfD7RYlNWbqRMPM_p9YTv-YwmsyQ"
        },
        {
            groupName: "Bearcats",
            members: 2255656,
            icon: "https://www.gannett-cdn.com/-mm-/e5553d9ad29b3854d3fce8cebf38e7c107b8cfaf/c=0-0-225-225/local/-/media/2016/06/03/Cincinnati/Cincinnati/636005682460337927-UC-logo-fancy.png?width=200&height=200&fit=crop"
        }
    ]
    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
