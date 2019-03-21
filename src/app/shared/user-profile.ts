export class UserProfile {
    public id: string;
    public displayName: string;
    public handle: string;
    public signature: string;
    public backgroundPhoto: string;
    public settings: {
        anonymous: boolean,
        allowEmailNotify: boolean,
        allowPushNotify: boolean,
        agreeToTerms: boolean,
        appTheme: string,
        mapTheme: string,
        typography: string,
    };
    public tags: string[];
    public groups: string[];
    public following: string[];
    public followers: string[];

    constructor() {
    
    }
}