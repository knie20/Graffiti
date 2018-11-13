import { Position } from 'nativescript-google-maps-sdk';
import { IUser } from './user.interfaces';
import { ICanvas } from './canvas.interface';

export interface IPost {
    createdAt: Date;
    updatedAt: Date;
    createdBy: IUser;
    canvas: ICanvas;
    history?: IPost[];
}

export interface ITag extends IPost {
    title: string;
    type: string;
    position: Position;
    upvotes: number;
    downvotes: number;
    content: {
        urls?: string[];
        text: string;
    }
    comments: IComment[];
}

export interface IComment extends IPost {
    upvotes: number;
    downvotes: number;
    content: {
        urls?: string[];
        text: string;
    }
}

export interface IVote extends IPost {
    value: number;
}