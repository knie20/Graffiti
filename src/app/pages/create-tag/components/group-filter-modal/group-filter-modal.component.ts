import { UserService } from '~/app/shared/user.service';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { GroupFilterService } from '../../services/group-filter.service';

@Component({
    selector: "app-group-filter-modal",
    templateUrl: './group-filter-modal.component.html',
    styleUrls: ['./group-filter-modal.component.scss']
})
export class GroupFilterModalComponent implements OnInit {

    private groups: Array<any> = [];
    public picked: any;

    constructor(private params: ModalDialogParams, private filter: GroupFilterService, private users: UserService) {

    }

    ngOnInit() {

        this.users.getCurrentUser().then(user => {

            this.filter.getGroupsForModal(user.uid).then(querySnapshot => {

                const groupObjects = []
    
                querySnapshot.forEach(doc => {
                    let groupData = doc.data();
                    groupData.id = doc.id;
                    groupObjects.push(groupData);
                });
    
                this.groups = groupObjects;
                console.log(this.groups);
    
            })
            .catch(err => {
                console.log(err);
            });
        })
    }

    close(group) {
        this.params.closeCallback(group);
    }
}

