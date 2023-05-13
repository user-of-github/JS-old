import { LoginResponse, PostResponse, PostsResponse, TagsResponse } from './types/serverResponses';
import { requestToServer } from './utils/requestToServer';
import { LoginRequest } from './types/ServerRequest';


export namespace API {
    export const fetchPosts = async (): Promise<PostsResponse> => {
        const response = await requestToServer<PostsResponse>({path: '/posts', method: 'get'});

        if (response === null) {
            return {success: false, error: 'Unable to fetch posts'};
        }

        return response;
    };

    export const fetchTags = async (): Promise<TagsResponse> => {
        const response = await requestToServer<TagsResponse>({path: '/posts/tags', method: 'get'});

        if (response === null) {
            return {success: false, error: 'Unable to fetch tags'};
        }

        return response;
    };

    export const fetchPostById = async (id: string): Promise<PostResponse> => {
        const response = await requestToServer<PostResponse>({path: `/posts/${id}`, method: 'get'});

        if (response === null) {
            return {success: false, error: 'Unable to find post'};
        }

        return response;
    };

    export const login = async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await requestToServer<LoginResponse>({
            path: `/auth/login`,
            method: 'post',
            body: data
        });

        if (response === null) {
            return {success: false, error: 'Unable to find post'};
        }

        return response;
    };
}
