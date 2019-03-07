import { Component, OnInit } from "@angular/core";
import { UserService } from '~/app/shared/user.service';
import { UserSettings } from "../classes/UserSettings";
import { ThemesList } from '../classes/ThemesList';
import { DataFormEventData, RadDataForm } from "nativescript-ui-dataform";


@Component({
    selector: "app-settings-form",
    moduleId: module.id,
    templateUrl: "./settings-form.component.html",
    styleUrls: ["./settings-form.component.css"]
})
export class SettingsFormComponent implements OnInit {

    private settings: UserSettings;
    private appThemesProvider: any;
    private mapThemesProvider: any;
    private typographiesProvider: any;
    
    constructor(private users: UserService) {}

    ngOnInit(): void {
        this.settings = new UserSettings(true, true, true, "Silver", "OG", "Robot", true);
        this.appThemesProvider = ["OG", "Retro", "Dark", "Hippie", "Big Yikes"];
        this.mapThemesProvider = ["Silver", "Retro", "Standard"];
        this.typographiesProvider = ["Roboto", "Helvetica"];
    }

    onPropertyCommitted(args: DataFormEventData) {
        let dataForm = <RadDataForm>args.object;
        let property = dataForm.getPropertyByName(args.propertyName);

        if(property.name == `appTheme`){
            this.settings.appTheme = property.value;
        }

        if(property.name == `mapTheme`){
            this.settings.mapTheme = property.value;
        }

        if(property.name == `typographies`){
            this.settings.typography = property.value;
        }

        //console.log('onPropertyCommitted -> name: ' + property.name + '; value: ' + property.valueCandidate);
        console.log(this.settings);
    }

    doSomething(event) {
        
    }

}
