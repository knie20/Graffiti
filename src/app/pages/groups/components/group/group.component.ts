import { UserService } from "~/app/shared/user.service";
import { GroupsService } from './../../services/groups.service';

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { Group } from './../../data-services/group';

import * as Firebase from "nativescript-plugin-firebase/app";

import * as app from "tns-core-modules/application";

@Component({
    selector: "app-group",
    moduleId: module.id,
    templateUrl: "./group.component.html",
    styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
    
    id: string;
    group: Group;
    photo: string;
    private memberList = [];

    storage = Firebase.storage().ref();

    constructor(private route: ActivatedRoute, private users: UserService, private groups: GroupsService) {
        
        this.group = new Group(``,``,``,``, ``, false, ``, ``);

        users.getCurrentUser().then((user)=>{
            
            this.id = this.route.snapshot.params['id'];
            
            try{

                groups.getGroupById(this.id).then(group => {
                    const data = group.data();
                    this.group.name = data.name
                    this.group.organization = data.organization;
                    this.group.photoURL = data.photoURL;
                });

                groups.getMembers(this.id)
                    .then(querySnapshot => {
                    
                        const memberObjects = []
                        
                        querySnapshot.forEach(doc => {
                            let memberData = doc.data();
                            memberObjects.push(memberData);
                        });
        
                        this.memberList = memberObjects;
        
                    })
                    .catch(err => {
                        console.log(err)
                    });

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
