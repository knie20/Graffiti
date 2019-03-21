import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GroupsListComponent } from "~/app/pages/groups/components/groups-list/groups-list.component";
import { CreateGroupFormComponent } from '~/app/pages/groups/components/create-group-form/create-group-form.component';
import { GroupComponent } from "~/app/pages/groups/components/group/group.component";

const routes: Routes = [
    { path: "", component: GroupsListComponent },
    { path: "id/:id", component: GroupComponent },
    { path: "create", component: CreateGroupFormComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GroupsRoutingModule { }
