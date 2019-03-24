import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GoogleMapsComponent } from "./components/google-maps/google-maps.component";
import { TagFabComponent } from "./components/tag-fab/tag-fab.component";
import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { MapTagService } from "./services/map-tag.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapRoutingModule
    ],
    declarations: [
        GoogleMapsComponent,
        MapComponent,
        TagFabComponent    
    ],
    providers: [
        MapTagService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapModule { }
