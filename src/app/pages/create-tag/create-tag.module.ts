// NativeScript modules
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from 'nativescript-angular/forms/forms.module';

// Angular modules
import { NativeScriptCommonModule } from "nativescript-angular/common";

// Routing Module
import { CreateTagRoutingModule} from "~/app/pages/create-tag/create-tag-routing.module";

// Components
import { CreateTagComponent } from "./create-tag.component";
import { TextTagFormComponent } from "~/app/pages/create-tag/components/text-tag-form/text-tag-form.component";
import { DrawingTagFormComponent } from './components/drawing-tag-form/drawing-tag-form.component';

// Services
import { CreateTagService } from './services/create-tag-service';

import { registerElement } from 'nativescript-angular/element-registry';
registerElement('PaintPad', () => require('nativescript-paint').PaintPad);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CreateTagRoutingModule,
    ],
    declarations: [
        CreateTagComponent,
        TextTagFormComponent,
        DrawingTagFormComponent,
    ],
    providers: [
        CreateTagService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class CreateTagModule { }