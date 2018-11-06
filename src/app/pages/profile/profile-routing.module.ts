import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ProfileComponent } from "~/app/pages/profile/profile.component";
import { ActivitiesComponent } from "~/app/pages/profile/components/activities/activities.component"

const routes: Routes = [
    { path: "", component: ProfileComponent },
    { path: "activities", component: ActivitiesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule { }
