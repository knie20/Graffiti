export class Group {
    public name: string;
    public organization: string;
    public location: string;
    public description: string;
    public isPublic: boolean;

    constructor(name: string, organization: string, location: string, description: string, isPublic: boolean) {
        this.name = name;
        this.organization = organization;
        this.location = location;
        this.description = description;
        this.isPublic = isPublic;
    }
}