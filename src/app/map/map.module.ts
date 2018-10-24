import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
  declarations: [
    GoogleMapsComponent
  ],
  exports: [
    GoogleMapsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class MapModule { }
