import { IUser } from "./user";

export interface IGroup {
    name: string;
    organization: string;
    location: string;
    description: string;
    members: string[];
    isPublic: boolean;
    createdOn: Date;
    createdBy: string;
}
