import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Tags",
    moduleId: module.id,
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.css"]
})
export class TagsComponent implements OnInit {
    
    tags = [
        {
            username: "mcewenal",
            description: "Posted a tag."
        },
        {
            username: "niekg",
            description: "Started following you."
        },
        {
            username: "muskelon",
            description: "Started following you."
        },
        {
            username: "thedude",
            description: "Liked your tag."
        },
        {
            username: "beercat",
            description: "Tagged near you."
        },
        {
            username: "fluffykins",
            description: "Disliked your tag."
        }
    ];

    constructor() {

    }

    ngOnInit(): void {
        // Init your component properties here.
    }

}
