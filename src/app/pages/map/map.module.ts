import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GoogleMapsComponent } from "./components/google-maps/google-maps.component";
import { TagFabComponent } from "./components/tag-fab/tag-fab.component";
import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { MapTagService } from "./services/map-tag.service";
import { MapFilterService } from './services/map-filter.service';
import { MapFilterModalComponent } from "./components/map-filter-modal/map-filter-modal.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapRoutingModule
    ],
    declarations: [
        GoogleMapsComponent,
        MapComponent,
        MapFilterModalComponent,
        TagFabComponent    
    ],
    providers: [
        MapTagService,
        MapFilterService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        MapFilterModalComponent
    ]
})
export class MapModule { }
