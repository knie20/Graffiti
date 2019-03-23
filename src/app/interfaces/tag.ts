import { Position } from 'nativescript-google-maps-sdk';
import { IPost } from './post';

export interface ITag extends IPost {
    type: string;
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
    position: Position;
}
