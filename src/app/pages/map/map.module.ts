import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MapRoutingModule } from "~/app/pages/map/map-routing.module";
import { MapComponent } from "~/app/pages/map/map.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapRoutingModule
    ],
    declarations: [
        MapComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapModule { }
