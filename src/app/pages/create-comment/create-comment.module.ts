import { CreateCommentFormComponent } from './components/create-comment-form/create-comment-form.component';
import { CreateCommentComponent } from './create-comment.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms/forms.module';

// Angular modules
import { NativeScriptCommonModule } from "nativescript-angular/common";

// Services
import { CreateCommentService } from './services/create-comment.service';
import { CreateCommentRoutingModule } from './create-comment-routing.module';

@NgModule({
    declarations: [
        CreateCommentComponent,
        CreateCommentFormComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CreateCommentRoutingModule
    ],
    exports: [],
    providers: [
        CreateCommentService
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class CreateCommentModule {

}