import { UserService } from '~/app/shared/user.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: "Following",
    moduleId: module.id,
    templateUrl: "./following.component.html",
    styleUrls: ["./following.component.css"]
})
export class FollowingComponent implements OnInit, OnChanges{
    
    @Input() following: any[];

    private _following: any[];

    constructor(private routerExtensions: RouterExtensions, users: UserService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this._following = changes['following'].currentValue;
    }

    ngOnInit(): void {
        this._following = this.following;
    }

    onFollowingItemTap(id: string): void {
        try {
            this.routerExtensions.navigate([`profile/id`, id ]);
        } catch (error) {
            console.log(error);
        }
    }

}
