import { borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";

export class Profile {
    public firstName: string;
    public lastName: string;
    public handle: string;
    public signature: string;
    public location: string;

    constructor(
        firstName: string,
        lastName: string,
        handle: string,
        signature: string,
        location: string
        ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.handle = handle;
        this.signature = signature;
        this.location = location;
    }
}