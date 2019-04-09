import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '~/app/shared/user.service';
import { Component, Input, NgZone } from '@angular/core';

@Component({
    selector: 'app-follow-fab',
    templateUrl: './follow-fab.component.html',
    styleUrls: ['./follow-fab.component.scss']
})
export class FollowFabComponent {

    @Input() userProfile: any;

    constructor(private users: UserService, private routerExtensions: RouterExtensions, private ngZone: NgZone) {

    }

    onFollowFabTap() {
        this.users.getCurrentUser().then(user => {
            this.users.follow(user.uid, this.userProfile);

            this.users.getById(user.uid).then(user => {
                const userData = user.data();
                this.users.addToFollowers(this.userProfile.id, userData);
            });

            this.ngZone.run(() => {
                this.routerExtensions.navigate([`profile/id`, this.userProfile.id ]);
            });
        })
    }
}
