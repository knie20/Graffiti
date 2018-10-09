import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProfileRoutingModule } from "~/app/pages/profile/profile-routing.module";
import { ProfileComponent } from "~/app/pages/profile/profile.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule { }
