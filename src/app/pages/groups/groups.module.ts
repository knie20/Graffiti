import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { BottomBarModule } from 'nativescript-bottombar/angular';

import { GroupsRoutingModule } from '~/app/pages/groups/groups-routing.module';
import { GroupsComponent } from '~/app/pages/groups/groups.component';
import { GroupsListComponent } from '~/app/pages/groups/components/groups-list/groups-list.component';
import { CreateGroupFabComponent } from '~/app/pages/groups/components/create-group-fab/create-group-fab.component';
import { CreateGroupFormComponent } from '~/app/pages/groups/components/create-group-form/create-group-form.component';
import { GroupComponent } from '~/app/pages/groups/components/group/group.component';
import { MembersListComponent } from '~/app/pages/groups/components/members-list/members-list.component';
import { MemberComponent } from '~/app/pages/groups/components/member/member.component';

import { UserService } from '~/app/shared/user.service';
import { GroupsService } from './services/groups.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroupsRoutingModule,
        NativeScriptUIDataFormModule,
        BottomBarModule
    ],
    declarations: [
        GroupsComponent,
        GroupsListComponent,
        CreateGroupFabComponent,
        CreateGroupFormComponent,
        GroupComponent,
        MembersListComponent,
        MemberComponent
    ],
    providers: [
        GroupsService,
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroupsModule { }
