import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "view-tag",
    templateUrl: "./view-tag.component.html"
})
export class ViewTagComponent implements OnInit {

    constructor(route: ActivatedRoute) {
        console.log("hi");
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
