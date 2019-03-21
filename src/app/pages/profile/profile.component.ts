import { Component, OnInit, ViewChild, Output, ChangeDetectionStrategy, SimpleChanges, OnChanges } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { alert } from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";

import { UserService } from '~/app/shared/user.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "Profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {

    private tabSelectedIndex: number;
    private tabSelectedIndexResult: string;

    private userId: string;
    private currentUser: string;
    private currentUserProfile: boolean;

    private photoURL: string;
    private displayName: string;
    private userEmail: string;
    private signature: string;
    private accountAge: number;

    followers: any[];
    following: any[];

    constructor(public route: ActivatedRoute, private router: Router, public users: UserService) {
        this.tabSelectedIndex = 0;
        this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.followers = [];
        this.following = [];
        this.photoURL = '';
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnInit(): void {

        this.route.params.subscribe(val => {

            this.users.getCurrentUser().then(user => {
                this.currentUser = user.uid;
                
                if(this.currentUser == this.userId){
                    this.currentUserProfile = true;
                }
            });

            this.userId = val.id;

            this.users.getById(this.userId)
                .then((document) => {
                    const data = document.data()
                    this.displayName = data.displayName;
                    this.userEmail = data.email;
                    this.signature = data.signature;
                    this.photoURL = data.photoURL;
                    return data;
                })
                .then(data => {
                    data.followers.forEach(follower => {
                        this.users.getById(follower)
                            .then((document) => {
                                this.followers.push(document.data());
                            })
                    });

                    data.following.forEach(user => {
                        this.users.getById(user)
                            .then((document) => {
                                this.following.push(document.data());
                            })
                    });
                    
                })
                .catch((err) => {
                    console.log("firestoreWhereUserHasId failed, error: " + err)
                });
        });
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
