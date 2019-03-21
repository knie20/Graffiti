import { UserService } from './../../../../shared/user.service';
import { GroupsService } from './../../services/groups.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';

import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import * as app from "tns-core-modules/application";
import { group } from '@angular/animations';

@Component({
    selector: 'app-groups-list',
    templateUrl: './groups-list.component.html',
    styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

    private groupList = [];
    private userId: string;

    constructor(private routerExtensions: RouterExtensions, public groups: GroupsService, public users: UserService) { 

    }

    ngOnInit(): void { 
        this.users.getCurrentUser().then((user)=>{
            this.groups.getGroupsByUserId(user.uid)
            .then(querySnapshot => {
                
                const groupObjects = []
                
                querySnapshot.forEach(doc => {
                    let groupData = doc.data();
                    groupData.id = doc.id;
                    groupObjects.push(groupData);
                });

                this.groupList = groupObjects;

                console.log(`Group list: `, this.groupList);
            })
            .catch(err => {
                console.log(`Did not get the groups!`)
            });
        })
    }

    onNavItemTap(id: string): void {
        this.routerExtensions.navigate([`/groups/id`, id ]);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
