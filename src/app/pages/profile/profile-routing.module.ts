import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ProfileComponent } from "~/app/pages/profile/profile.component";
import { ActivitiesComponent } from './components/activities/activities.component';
import { FriendsComponent } from './components/friends/friends.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
    { path: "", component: ProfileComponent },
    { path: "activities", component: ActivitiesComponent },
    { path: "friends", component: FriendsComponent },
    { path: "tags", component: TagsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule { }
