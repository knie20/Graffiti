import { MessagingService } from './../../../shared/messaging.service';
import { UserSettings } from './../classes/UserSettings';
import { Component, OnInit } from "@angular/core";
import { UserService } from '~/app/shared/user.service';
import { ThemesList } from '../classes/ThemesList';
import { DataFormEventData, RadDataForm } from "nativescript-ui-dataform";


@Component({
    selector: "app-settings-form",
    moduleId: module.id,
    templateUrl: "./settings-form.component.html",
    styleUrls: ["./settings-form.component.css"]
})
export class SettingsFormComponent implements OnInit {

    private userId: string;
    private settings: UserSettings;
    private appThemesProvider: any;
    private mapThemesProvider: any;
    private typographiesProvider: any;
    
    constructor(private users: UserService, private messaging: MessagingService) {
        this.appThemesProvider = ["OG", "Retro", "Dark", "Hippie", "Big Yikes"];
        this.mapThemesProvider = ["Silver", "Retro", "Standard"];
        this.typographiesProvider = ["Roboto", "Helvetica"];
    }

    ngOnInit(): void {

        this.users.getCurrentUser().then(user => {

            this.userId = user.uid;

            this.users.getById(user.uid).then(user => {
                const data = user.data();
                const settings = data.settings;

                this.settings = new UserSettings(
                    settings.anonymous,
                    settings.allowPushNotify,
                    settings.allowEmailNotify,
                    settings.appTheme,
                    settings.mapTheme,
                    settings.typography,
                    settings.agreeToTerms
                );

                console.log(`My settings: `, this.settings);
            })
        });
        
    }

    onPropertyCommitted(args: DataFormEventData) {
        let dataForm = <RadDataForm>args.object;
        let property = dataForm.getPropertyByName(args.propertyName);

/*         if(property.name == `anonymous`){
            console.log(`Value: `, property.value);
            this.settings.anonymous = property.value;
        }

        if(property.name == `allowPushNotify`){
            this.settings.allowPushNotify = property.value;
        }

        if(property.name == `allowEmailNotify`){
            this.settings.allowEmailNotify = property.value;
        }

        if(property.name == `appTheme`){
            this.settings.appTheme = property.value;
        }

        if(property.name == `mapTheme`){
            this.settings.mapTheme = property.value;
        }

        if(property.name == `typography`){
            this.settings.typography = property.value;
        }

        if(property.name == `agreeToTerms`){
            this.settings.agreeToTerms = property.value;
        } */

        //console.log('onPropertyCommitted -> name: ' + property.name + '; value: ' + property.valueCandidate);
        console.log(this.settings);

        if(this.settings.allowPushNotify == true){
            this.messaging.doRequestConsent();
        }
        else if(this.settings.allowPushNotify == false ) {
            this.messaging.doUnregisterForPushNotifications();
        }

        this.users.updateUserSettings(this.userId, this.settings).then(()=>{
            console.log(`User settings updated!`);
        })
    }

    doSomething(event) {
        
    }

}
