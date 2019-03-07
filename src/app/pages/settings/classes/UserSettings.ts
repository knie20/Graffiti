import { enable } from "tns-core-modules/trace/trace";

export class UserSettings {
    public anonymous: boolean;
    public allowPushNotify: boolean;
    public allowEmailNotify: boolean;
    public appTheme: string;
    public mapTheme: string;
    public typography: string;
    public agreeToTerms: boolean;

    constructor(
        anonymous: boolean,
        allowPushNotify: boolean, 
        allowEmailNotify: boolean,
        appTheme: string,
        mapTheme: string,
        typography: string,
        agreeToTerms: boolean
    ) {
        this.anonymous = anonymous;
        this.allowPushNotify = allowPushNotify;
        this.allowEmailNotify = allowEmailNotify;
        this.appTheme = appTheme;
        this.mapTheme = mapTheme;
        this.typography = typography;
        this.agreeToTerms = agreeToTerms;
    }
}