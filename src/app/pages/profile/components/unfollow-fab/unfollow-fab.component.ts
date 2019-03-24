import { UserService } from '~/app/shared/user.service';
import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-unfollow-fab',
  templateUrl: './unfollow-fab.component.html',
  styleUrls: ['./unfollow-fab.component.scss']
})
export class UnfollowFabComponent{

  @Input() userProfile: any;

  constructor(private users: UserService, private routerExtensions: RouterExtensions) {

  }

  onUnfollowFabTap() {
    this.users.getCurrentUser().then(user => {
        this.users.unfollow(user.uid, this.userProfile).then((user) => {
            console.log(`No longer following that person`);
        })

        this.users.getById(user.uid).then(user => {
            const userData = user.data();
            this.users.removeFromFollowers(this.userProfile.id, userData);
        })
        
        this.routerExtensions.navigate([`profile/id`, this.userProfile.id ]);
    })
  }
}