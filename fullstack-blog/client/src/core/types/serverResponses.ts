import { Post } from './Post';
import { User } from './User';

interface SuccessfulResponse {
    success: true;
}

interface UnsuccessfulResponse {
    success: false;
    error: string | string[];
}

type SuccessfulLoginResponse = SuccessfulResponse & { user: User, token: string }
export type LoginResponse = SuccessfulLoginResponse | UnsuccessfulResponse


type SuccessfulPostChange = SuccessfulResponse & { post?: Post };
export type PostResponse = UnsuccessfulResponse | SuccessfulPostChange;

type SuccessfulPostsChange = SuccessfulResponse & { posts: Post[] };
export type PostsResponse = UnsuccessfulResponse | SuccessfulPostsChange;

type SuccessfulTagsResponse = SuccessfulResponse & { tags: string[] };
export type TagsResponse = UnsuccessfulResponse | SuccessfulTagsResponse;
