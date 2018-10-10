import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { MapRoutingModule } from './map-routing.module';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    MapRoutingModule
  ],
  declarations: []
})
export class MapModule { }
