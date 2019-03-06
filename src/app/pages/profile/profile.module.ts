import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ProfileRoutingModule } from '~/app/pages/profile/profile-routing.module';
import { ProfileComponent } from '~/app/pages/profile/profile.component';
import { AvatarComponent } from '~/app/pages/profile/components/avatar/avatar.component';

import { ActivitiesComponent } from '~/app/pages/profile/components/activities/activities.component';
import { TagsComponent } from '~/app/pages/profile/components/tags/tags.component';
import { FriendsComponent } from '~/app/pages/profile/components/friends/friends.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        AvatarComponent,
        ActivitiesComponent,
        TagsComponent,
        FriendsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule { }
