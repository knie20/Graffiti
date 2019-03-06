import { UserService } from './../../../../shared/user.service';
import { GroupsService } from './../../services/groups.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';

import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import * as app from "tns-core-modules/application";

@Component({
    selector: 'app-groups-list',
    templateUrl: './groups-list.component.html',
    styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

    private groupList = [];
    private userId: string;

    constructor(private routerExtensions: RouterExtensions, groups: GroupsService, users: UserService) { 
        users.getCurrentUser().then((user)=>{
            this.groupList = groups.getGroupsByUserId(user.uid);
        })
    }

    ngOnInit(): void { }

    onNavItemTap(name: string): void {
        this.routerExtensions.navigate([`/groups/name`, name ]);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
