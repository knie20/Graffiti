import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Friends",
    moduleId: module.id,
    templateUrl: "./friends.component.html",
    styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
    
    friends = [
        {
            name: "Kaidong Nie",
            username: "niekg",
        },
        {
            name: "Elon Musk",
            username: "muskel",
        },
        {
            name: "Fluffy Kins",
            username: "fluffykins",
        },
        {
            name: "Jim Scott",
            username: "scottji",
        },
        {
            name: "Abdou Fall",
            username: "fallab",
        },
        {
            name: "Bearcat McBearcatterson",
            username: "bearcatmcgee",
        }
    ];

    constructor() {

    }

    ngOnInit(): void {
        // Init your component properties here.
    }

}
