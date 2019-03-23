import { UserService } from "~/app/shared/user.service";
import { GroupsService } from './../../services/groups.service';

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { IGroup } from "~/app/interfaces/group";


import * as app from "tns-core-modules/application";

@Component({
    selector: "app-group",
    moduleId: module.id,
    templateUrl: "./group.component.html",
    styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
    
    name: string;
    group: IGroup;

    constructor(private route: ActivatedRoute, private users: UserService, private groups: GroupsService) {
        users.getCurrentUser().then((user)=>{
            this.name = this.route.snapshot.params['name'];
            try{
                this.group = groups.getGroupById(this.name);
                console.log(this.group);
            } catch(err){
                console.log(err);
            }
        })
    }

    ngOnInit(): void {

    }
    
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
