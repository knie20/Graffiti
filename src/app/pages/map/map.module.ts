import { GoogleMapsComponent } from './../../map/components/google-maps/google-maps.component';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { MapTagService } from '~/app/map/services/map-tag.service';

import { TagFabComponent } from './components/tag-fab/tag-fab.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapRoutingModule
    ],
    declarations: [
        GoogleMapsComponent,
        MapComponent,
        TagFabComponent,
    ],
    providers: [
        MapTagService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapModule { }
