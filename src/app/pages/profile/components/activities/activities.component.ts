import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Activities",
    moduleId: module.id,
    templateUrl: "./activities.component.html",
    styleUrls: ["./activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
    
    activities = [
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
