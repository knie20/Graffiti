import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GroupsRoutingModule } from "~/app/pages/groups/groups-routing.module";
import { GroupsComponent } from "~/app/pages/groups/groups.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroupsRoutingModule
    ],
    declarations: [
        GroupsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroupsModule { }
