//NativeScript Modules
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

//Modules
import { ViewTagRoutingModule } from '~/app/pages/view-tag/view-tag-routing.module';

//Components
import { ViewTagComponent } from '~/app/pages/view-tag/view-tag.component';
import { TagComponent } from '~/app/pages/view-tag/components/tag/tag.component';
import { CommentsComponent } from '~/app/pages/view-tag/components/comments/comments.component';
import { CommentComponent } from '~/app/pages/view-tag/components/comment/comment.component';


//Services
import { TagService } from "~/app/shared/tag.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewTagRoutingModule
    ],
    declarations: [
        ViewTagComponent,
        TagComponent,
        CommentsComponent,
        CommentComponent
    ],
    providers: [
        TagService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewTagModule { }
