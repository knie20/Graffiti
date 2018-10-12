import { MapViewComponent } from './pages/map-view/map-view.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
  {path: "", component: MapViewComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class MapRoutingModule { }
