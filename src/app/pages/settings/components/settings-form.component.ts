import { Component, OnInit } from "@angular/core";

import { Settings } from "../interfaces/settings.interface";

@Component({
    selector: "app-settings-form",
    moduleId: module.id,
    templateUrl: "./settings-form.component.html",
    styleUrls: ["./settings-form.component.css"]
})
export class SettingsFormComponent implements OnInit {

    private _settings: Settings;
    
    constructor() {}

    ngOnInit(): void {
        this._settings = new Settings("mcewenal", "Andrew McEwen", "mcewenal@mail.uc.edu", true, true, true);
    }

    doSomething(event) {
        
    }

}
