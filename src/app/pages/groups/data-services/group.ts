export class Group {
    public name: string;
    public organization: string;
    public location: string;
    public description: string;
    public photoURL: string;
    public isPublic: boolean;
    public createdOn: string;
    public createdBy: string;

    constructor(
        name: string, 
        organization: string, 
        location: string, 
        description: string,
        photoURL: string, 
        isPublic: boolean,
        createdOn: string,
        createdBy: string) {

        this.name = name;
        this.organization = organization;
        this.location = location;
        this.description = description;
        this.photoURL = photoURL;
        this.isPublic = isPublic;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
    }
}