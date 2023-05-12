import { Post } from './Post';

interface SuccessfulResponse {
    success: true;
}

interface UnsuccessfulResponse {
    success: false;
    error: string | string[];
}



type SuccessfulPostChange = SuccessfulResponse & { post?: Post };
export type PostResponse = UnsuccessfulResponse | SuccessfulPostChange;

type SuccessfulPostsChange = SuccessfulResponse & { posts: Post[] };
export type PostsResponse = UnsuccessfulResponse | SuccessfulPostsChange;

