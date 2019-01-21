import { Position } from 'nativescript-google-maps-sdk';
import { IUser } from './user.interfaces';
import { ICanvas } from './canvas.interface';

export interface IPost {
    createdAt: number;
    updatedAt: number;
    createdBy: string;
}

export interface ITag {
    id: number,
    text: string
}

export interface IComment extends IPost {
    upvotes: number;
    downvotes: number;
    content: {
        urls: string[];
        text: string;
    }
}

export interface IVote extends IPost {
    value: number;
}