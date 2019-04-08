import { Image } from 'tns-core-modules/ui/image';
import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

import { TKEntityPropertyDirective } from 'nativescript-ui-dataform/angular';

// Angular Core Components
import { Component, OnInit } from '@angular/core';

// NativeScript Plugins
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as imagepicker from "nativescript-imagepicker";

// NativeScript Core Modules
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import * as app from "tns-core-modules/application";

// Classes
import { Group } from "../../data-services/group";
import { TouchAction } from "tns-core-modules/ui/gestures/gestures";

// Services
import { GroupsService } from './../../services/groups.service';
import { UserService } from '~/app/shared/user.service';

@Component({
    selector: 'app-create-group-form',
    templateUrl: './create-group-form.component.html',
    styleUrls: ['./create-group-form.component.css']
})
export class CreateGroupFormComponent implements OnInit {
    private userId: string;
    private _group: Group;
    private today: Date;
    private imageAssets = [];
    private imageSrc: any;
    private imageFile: File;
    private isSingleMode: boolean = true;

    constructor(private groups: GroupsService, private users: UserService) {
        this.today = new Date();
        users.getCurrentUser().then((user) => {
            this.userId = user.uid;
        })
    }

    ngOnInit(): void {
        this._group = new Group("", "", "", "", "", true, "", "");
    }

    get group(): Group {
        return this._group;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onEditPhotoButtonTap(): void {
        const that = this;
        const milliseconds = (new Date).getTime();

        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {
                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
                selection.forEach(function (selected) {

                    const selectedFile: File = File.fromPath(selected.android);
                    that.imageFile = selectedFile;

/*                     const source = new ImageSource();
                    source.fromAsset(selected)
                        .then((imageSource: ImageSource) => {
                            const folderPath: string = knownFolders.documents().path;
                            const fileName = `${milliseconds}.png`;
                            const filePath = path.join(folderPath, fileName);
                            const saved: boolean = imageSource.saveToFile(filePath, "png");
                            
                            if (saved) {
                                const imageFile: File = File.fromPath(filePath);
                                console.log(imageFile);
                            }
                        }) */
                });
                that.imageAssets = selection;
            }).catch(function (e) {
                console.log(e);
            });
    }

    onCreateGroupButtonTap(): void {
        const newGroup = {
            name: this._group.name,
            organization: this._group.organization,
            location: this._group.location,
            description: this._group.description,
            members: [this.userId],
            isPublic: this._group.isPublic,
            createdOn: new Date(),
            createdBy: this.userId,
        }

        this.groups.create(newGroup, this.imageFile);
    }
}
