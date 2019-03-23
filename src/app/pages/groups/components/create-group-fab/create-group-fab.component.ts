import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "CreateGroupFab",
    moduleId: module.id,
    templateUrl: "./create-group-fab.component.html",
    styleUrls: ["./create-group-fab.component.css"]
})
export class CreateGroupFabComponent implements OnInit {
    
    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
        
    }

    fabTap() {
        console.log(`Yum yum, tap my fab!`)
        this.routerExtensions.navigate([`/groups/create`]);
    }

}
