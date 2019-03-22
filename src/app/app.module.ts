import { MessagingService } from './shared/messaging.service';
import { UserService } from '~/app/shared/user.service';
// NativeScript modules
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

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
        BottomBarModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthService,
        UserService,
        MessagingService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
