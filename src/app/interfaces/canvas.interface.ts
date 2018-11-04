import { IUser } from "./user.interfaces";
import { IGroup } from "./group.interface";

export interface ICanvas {
    createdAt: Date;
    updatedAt: Date;
    createdBy: IUser;
    owningGroups: IGroup[];
}