import { MapComponent } from './components/map/map.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { MapRoutingModule } from './map-routing.module';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    MapRoutingModule
  ],
  declarations: [
    MapViewComponent,
    MapComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class MapModule { }
