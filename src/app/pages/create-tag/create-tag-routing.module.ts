import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CreateTagComponent } from './create-tag.component';
import { TextTagFormComponent } from "~/app/pages/create-tag/components/text-tag-form/text-tag-form.component";

const routes: Routes = [
    { 
        path: "", 
        component: CreateTagComponent, 
        children: [
            {
                path: "", 
                component: TextTagFormComponent
            }
        ]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreateTagRoutingModule { }