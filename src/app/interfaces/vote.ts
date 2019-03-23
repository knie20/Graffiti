import { IPost } from './post';

export interface IVote extends IPost {
    userId: number;
    value: number;
}
