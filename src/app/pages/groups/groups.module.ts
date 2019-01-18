import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GroupsRoutingModule } from "~/app/pages/groups/groups-routing.module";
import { GroupsComponent } from "~/app/pages/groups/groups.component";
import { AddGroupFabComponent } from "~/app/pages/groups/components/add-group-fab/add-group-fab.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroupsRoutingModule
    ],
    declarations: [
        GroupsComponent,
        AddGroupFabComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroupsModule { }
