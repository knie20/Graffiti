import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-edit-profile-fab",
    moduleId: module.id,
    templateUrl: "./edit-profile-fab.component.html",
    styleUrls: ["./edit-profile-fab.component.scss"],
})
export class EditProfileFabComponent implements OnInit {

    @ViewChild('fab') fab: ElementRef;

    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {

    }

    onEditProfileFabTap() {
        console.log('tapped');
        this.routerExtensions.navigate([`/profile/edit`]);
    }

}
