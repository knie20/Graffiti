import { IUser } from "./user.interfaces";

export interface IGroup {
    createdAt: Date;
    updatedAt?: Date;
    createdBy: IUser;
    owners: IUser[];
}

export interface IMembership {
    group: IGroup;
    user: IUser;
    startDate: Date;
    endDate: Date;
    role: IRole;
}

export interface IRole {
    name: string;
    permissions: string[];
}