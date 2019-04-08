// NativeScript Modules
import { NativeScriptRouterModule } from "nativescript-angular/router";

// Angular Modules
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Components
import { CreateCommentComponent } from "./create-comment.component";
import { CreateCommentFormComponent } from "./components/create-comment-form/create-comment-form.component";

const routes: Routes = [
    { 
        path: "", 
        component: CreateCommentComponent, 
        children: [
            {
                path: "tag-id/:id", 
                component: CreateCommentFormComponent
            }
        ]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreateCommentRoutingModule { 
    
}