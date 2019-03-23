import { IPost } from './post';

export interface IComment extends IPost {
    userId: number;
    text: string;
    upvotes: number;
    downvotes: number;
}
