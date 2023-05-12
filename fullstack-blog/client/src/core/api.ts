import { PostsResponse } from './types/serverResponses';
import axios from './axios';


export namespace API {
    export const fetchPosts = async (): Promise<PostsResponse> => {
        const response: PostsResponse = await axios.get('/posts');


        if (!response.success) {
            console.error(response.error);
        }

        return response;
    };
}
