import { UserService } from '~/app/shared/user.service';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { SettingsFormComponent } from "./components/settings-form.component"

import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular"

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        SettingsComponent,
        SettingsFormComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
