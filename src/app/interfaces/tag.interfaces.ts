import { Position, Marker } from 'nativescript-google-maps-sdk';
import { IUser } from './user.interfaces';
import { ICanvas } from './canvas.interface';

export interface IPost {
    createdAt: Date;
    createdBy: IUser;
}

export interface ITag {
    id: string;
    text: string;
    position: {
        latitude: number;
        longtitude: number;
    }
    tally: ITally;
}

export interface IComment extends IPost {
    tagId: string;
    content: {
        text: string;
    }
    tally: ITally;
}

export interface IVote extends IPost {
    value: number;
}

export interface ITally {
    upvotes: number;
    downvotes: number;
    votes: Array<IVote>;
}