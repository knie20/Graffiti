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
            name: "Dustin Smith",
            username: "smithda",
        },
        {
            name: "Kenny Carpenter",
            username: "carpenterke",
        },
        {
            name: "Rachel McEwen",
            username: "mcewenra",
        },
        {
            name: "Meagin Vizecky",
            username: "vizeckyme",
        },
        {
            name: "Edin Brown",
            username: "browned",
        }
    ];

    constructor() {

    }

    ngOnInit(): void {
        // Init your component properties here.
    }

}
