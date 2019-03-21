import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ProfileComponent } from '~/app/pages/profile/profile.component';
import { EditProfileFormComponent } from '~/app/pages/profile/components/edit-profile-form/edit-profile-form.component';
import { ActivitiesComponent } from '~/app/pages/profile/components/activities/activities.component';
import { FollowingComponent } from '~/app/pages/profile/components/following/following.component';
import { FollowersComponent } from '~/app/pages/profile/components/followers/followers.component';

const routes: Routes = [
    { path: 'id/:id', component: ProfileComponent },
    { path: 'edit', component: EditProfileFormComponent},
    { path: 'activities', component: ActivitiesComponent },
    { path: 'following', component: FollowingComponent },
    { path: 'followers', component: FollowersComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule { }
