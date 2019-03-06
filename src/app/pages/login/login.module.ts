import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';


import { LoginRoutingModule } from "~/app/pages/login/login-routing.module";
import { LoginComponent } from "~/app/pages/login/login.component";
import { UserService } from "~/app/shared/user.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
