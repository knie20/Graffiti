import { ListPicker } from "tns-core-modules/ui/list-picker";
import { MapFilterService } from './../../services/map-filter.service';
import { UserService } from '~/app/shared/user.service';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "app-map-filter-modal",
    templateUrl: './map-filter-modal.component.html',
    styleUrls: ['./map-filter-modal.component.scss']
})
export class MapFilterModalComponent implements OnInit {

    private groups: Array<any> = [];
    public picked: any;

    constructor(private params: ModalDialogParams, private filter: MapFilterService, private users: UserService) {

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
                console.log(`Did not get the groups!`)
            });
        })
    }

    close(groupId) {
        this.params.closeCallback(groupId);
    }
}

