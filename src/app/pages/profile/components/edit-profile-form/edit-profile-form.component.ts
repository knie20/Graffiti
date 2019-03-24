import { Profile } from '../../data-services/profile';
import { Image } from 'tns-core-modules/ui/image';
import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

import { TKEntityPropertyDirective } from 'nativescript-ui-dataform/angular';

// Angular Core Components
import { Component, OnInit, NgZone } from '@angular/core';

// NativeScript Plugins
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as imagepicker from "nativescript-imagepicker";

// NativeScript Core Modules
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import * as app from "tns-core-modules/application";
import { alert, prompt } from "tns-core-modules/ui/dialogs";


// Classes

// Services
import { UserService } from '~/app/shared/user.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'app-edit-profile-form',
    templateUrl: './edit-profile-form.component.html',
    styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {

    private userId: string;

    private imageAssets = [];
    private avatarSrc: any;
    private backgroundSrc: any;
    private imageFile: File;
    private isSingleMode: boolean = true;
    private _profile: Profile;

    constructor(
        private users: UserService, 
        private routerExtensions: RouterExtensions, 
        private ngZone: NgZone
    ) {
        this._profile = new Profile("", "", "", "", "");
    }

    ngOnInit(): void {
        this.users.getCurrentUser().then((user) => {
            this.userId = user.uid;
            
            this.users.getById(this.userId).then((user) => {
                const data = user.data();
                this.avatarSrc = data.photoURL;
            })
        })
    }

    get profile(): Profile {
        return this._profile;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onEditAvatarButtonTap(): void {
        const that = this;
        const milliseconds = (new Date).getTime();

        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.avatarSrc = null;
                return context.present();
            })
            .then((selection) => {
                that.avatarSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
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

    onEditBackgroundButtonTap(): void {
        const that = this;
        const milliseconds = (new Date).getTime();

        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.backgroundSrc = null;
                return context.present();
            })
            .then((selection) => {
                that.backgroundSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
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

    onSaveButtonTap(): void {
        this.users.updateUser(this.userId, this._profile)
            .then(()=>{
                alert({
                    title: "Hello from Graffiti!",
                    message: `Your profile has been updated!`,
                    okButtonText: "Good to know"
                })
                .then(()=>{
                    this.routerExtensions.navigate([`profile/id`, this.userId ]);
                });

            })
    }
}
