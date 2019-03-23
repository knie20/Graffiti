import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { ActivatedRoute } from "@angular/router";
import { ITag } from "~/app/interfaces/tag.interfaces";
import { Button } from "tns-core-modules/ui/button/button";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "view-tag",
    moduleId: module.id,
    templateUrl: "./view-tag.component.html"
})
export class ViewTagComponent implements OnInit {

    tag: ITag;

    constructor(route: ActivatedRoute) {
        console.log("hi");
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onBackButtonTapped = (event) => {
        const button: Button = <Button>event.object;
        const page: Page = button.page;
        page.frame.goBack();
    }
}
