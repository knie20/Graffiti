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

    private currentUser: string;

    @Output("userId")
    private userId: string;

    @Output("photoURL")
    private userPhotoURL: string;

    @Output("userProfile")
    private userProfile: any;

    private userDisplayName: string;
    private userHandle: string;
    private userEmail: string;
    private userSignature: string;

    private amFollowing: boolean;
    private currentUserProfile: boolean;

    @Output("followers")
    followers: any[];

    @Output("following")
    following: any[];

    constructor(public route: ActivatedRoute, private router: Router, public users: UserService) {
        this.tabSelectedIndex = 0;
        this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.amFollowing = false;
        this.currentUserProfile = false;
        this.followers = [];
        this.following = [];
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
                    const data = document.data();
                    this.userDisplayName = data.displayName;
                    this.userHandle = data.handle;
                    this.userEmail = data.email;
                    this.userSignature = data.signature;
                    this.userPhotoURL = data.photoURL;

                    const userProfile = {
                        id: document.id,
                        handle: data.handle,
                        displayName: data.displayName,
                        email: data.email,
                        signature: data.signature,
                        photoURL: data.photoURL
                    }

                    this.userProfile = userProfile;

                    return data;
                })
                .then(() => {
                    console.log(`Getting following for ${this.userId}`)
                    this.users.getFollowingByUserId(this.userId)
                        .then(querySnapshot => {
                            querySnapshot.forEach(document =>{
                                const data = document.data();

                                const followingObject = {
                                    id: document.id,
                                    displayName: data.displayName,
                                    handle: data.handle,
                                    photoURL: data.photoURL
                                }

                                this.following.push(followingObject);
                            })
                        });

                    this.users.getFollowersByUserId(this.userId)
                        .then(querySnapshot => {
                            querySnapshot.forEach(document =>{
                                const data = document.data();

                                if(this.currentUser == this.userId){
                                    this.currentUserProfile = true;
                                }

                                if(this.currentUser == document.id){
                                    this.amFollowing = true;
                                }
                                
                                if(this.currentUser != document.id){
                                    this.amFollowing = false;
                                }

                                const docObject = {
                                    id: document.id,
                                    displayName: data.displayName,
                                    handle: data.handle,
                                    photoURL: data.photoURL
                                }

                                console.log(`Pushing a follower: `, docObject)
                                this.followers.push(docObject);
                            })
                        })
                })
                .catch((err) => {
                    console.log("firestoreWhereUserHasId failed, error oh no: " + err)
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
