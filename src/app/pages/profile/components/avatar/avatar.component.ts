import { UserService } from './../../../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    private userPhotoUrl: string;
    
    constructor(users: UserService) { 
        users.getCurrentUser().then((user)=>{
            users.getPhotoByUserId(user.uid).then(photoUrl=>{
                this.userPhotoUrl = photoUrl;
            });
        })
    }

    ngOnInit(): void { }
}
