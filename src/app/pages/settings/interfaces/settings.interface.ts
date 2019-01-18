import { enable } from "tns-core-modules/trace/trace";

export class Settings {
    public username: string;
    public displayName: string;
    public email: string;
    public enableNotifications: boolean;
    public enableLocation: boolean;
    public agreeWithTerms: boolean;

    constructor(
        username: string,  
        displayName: string, 
        email: string, 
        enableNotifications: boolean, 
        enableLocation: boolean,
        agreeWithTerms: boolean
    ) {
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.enableNotifications = enableNotifications;
        this.enableLocation = enableLocation;
        this.agreeWithTerms = this.agreeWithTerms;
    }
}