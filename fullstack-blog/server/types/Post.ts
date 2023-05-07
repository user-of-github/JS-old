import { SuccessfulResponse, UnsuccessfulResponse } from './SuccessResponse';
import { User } from './User';

export interface Post {
    title: string;
    text: string;
    imageUrl?: string;
    tags: string[];
    author: unknown;
}

export interface PostDocument {
    _doc: Post;
    _id: unknown;
}

type SuccessfulPostChange = SuccessfulResponse & { post?: Post };
export type PostResponse = UnsuccessfulResponse | SuccessfulPostChange;

type SuccessfulPostsChange = SuccessfulResponse & { posts?: Post[] };
export type PostsResponse = UnsuccessfulResponse | SuccessfulPostsChange;
