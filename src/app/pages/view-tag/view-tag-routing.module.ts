import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TagComponent } from '~/app/pages/view-tag/components/tag/tag.component';
import { ViewTagComponent } from './view-tag.component';

const routes: Routes = [
    { path: "", component: ViewTagComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewTagRoutingModule { }
