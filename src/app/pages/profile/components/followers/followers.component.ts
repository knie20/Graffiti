import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, OnChanges } from "@angular/core";

import { UserService } from '../../../../shared/user.service';
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Followers",
    moduleId: module.id,
    templateUrl: "./followers.component.html",
    styleUrls: ["./followers.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowersComponent implements OnInit, OnChanges {

    @Input() followers: any[];

    private _followers: any[];

    constructor(private routerExtensions: RouterExtensions, public users: UserService) {

    }
    
    ngOnChanges(changes: SimpleChanges) {
        this._followers = changes['followers'].currentValue;
    }

    ngOnInit(): void {
        console.log(`On followers init...`)
        this._followers = this.followers;
    }
    
    onFollowerItemTap(id: string): void {
        try {
            this.routerExtensions.navigate([`profile/id`, id ]);
        } catch (error) {
            console.log(error);
        }
    }

}
