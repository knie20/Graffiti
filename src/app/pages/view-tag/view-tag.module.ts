import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ViewTagComponent } from "./view-tag.component";
import { ViewTagService } from "./services/view-tag.service";
import { ViewTagRoutingModule } from "./view-tag-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewTagRoutingModule
    ],
    declarations: [
        ViewTagComponent
    ],
    providers: [
        ViewTagService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewTagModule { }
