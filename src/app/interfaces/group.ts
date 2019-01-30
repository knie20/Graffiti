import { IUser } from "./user";

export interface IGroup {
    id: number;
    name: string;
    createdOn: Date;
    createdBy: number;
}
