// NativeScript Modules
import * as app from "tns-core-modules/application";

// Angular Modules
import { Component, OnInit } from "@angular/core";

// NativeScript Plugins
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "app-create-comment",
    moduleId: module.id,
    templateUrl: "./create-comment.component.html"
})
export class CreateCommentComponent implements OnInit {
    constructor() {

    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}