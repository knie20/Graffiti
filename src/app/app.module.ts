import { UserService } from '~/app/shared/user.service';
// NativeScript modules
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

// NativeScript Plugins
import { BottomBarModule } from 'nativescript-bottombar/angular';

// Angular modules
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// Routing module
import { AppRoutingModule } from "./app-routing.module";

// App component
import { AppComponent } from "./app.component";
import { AuthService } from './shared/auth.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        BottomBarModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthService,
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
