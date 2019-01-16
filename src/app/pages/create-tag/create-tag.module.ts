import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CreateTagRoutingModule} from "~/app/pages/create-tag/create-tag-routing.module";
import { CreateTagComponent } from "./create-tag.component";
import { TextTagFormComponent } from "~/app/pages/create-tag/components/text-tag-form/text-tag-form.component";

import { CreateTagService } from './services/create-tag-service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CreateTagRoutingModule
    ],
    declarations: [
        CreateTagComponent,
        TextTagFormComponent
    ],
    providers: [
        CreateTagService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateTagModule { }