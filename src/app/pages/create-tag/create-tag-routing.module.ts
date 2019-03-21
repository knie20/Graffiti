// NativeScript Modules
import { NativeScriptRouterModule } from "nativescript-angular/router";

// Angular Modules
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Components
import { CreateTagComponent } from './create-tag.component';
import { TextTagFormComponent } from "~/app/pages/create-tag/components/text-tag-form/text-tag-form.component";
import { DrawingTagFormComponent } from './components/drawing-tag-form/drawing-tag-form.component';


const routes: Routes = [
    { 
        path: "", 
        component: CreateTagComponent, 
        children: [
            {
                path: "text", 
                component: TextTagFormComponent
            },
            {
                path: "drawing", 
                component: DrawingTagFormComponent
            }
        ]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreateTagRoutingModule { }