// NativeScript Modules
import * as app from "tns-core-modules/application";

// Angular Modules
import { Component, OnInit } from "@angular/core";

// NativeScript Plugins
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "CreateTag",
    moduleId: module.id,
    templateUrl: "./create-tag.component.html"
})
export class CreateTagComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}