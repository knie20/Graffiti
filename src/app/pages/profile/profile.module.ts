import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ProfileRoutingModule } from '~/app/pages/profile/profile-routing.module';
import { ProfileComponent } from '~/app/pages/profile/profile.component';
import { AvatarComponent } from '~/app/pages/profile/components/avatar/avatar.component';

import { EditProfileFabComponent } from '~/app/pages/profile/components/edit-profile-fab/edit-profile-fab.component';
import { EditProfileFormComponent } from '~/app/pages/profile/components/edit-profile-form/edit-profile-form.component';
import { ActivitiesComponent } from '~/app/pages/profile/components/activities/activities.component';
import { FollowersComponent } from '~/app/pages/profile/components/followers/followers.component';
import { FollowingComponent } from '~/app/pages/profile/components/following/following.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        AvatarComponent,
        EditProfileFabComponent,
        EditProfileFormComponent,
        ActivitiesComponent,
        FollowersComponent,
        FollowingComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule { }
