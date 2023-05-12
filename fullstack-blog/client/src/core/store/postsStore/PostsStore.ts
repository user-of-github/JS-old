import { makeObservable, observable } from 'mobx';
import { LoadingStatus } from '../../types/LoadingStatus';
import { API } from '../../api';
import { PostsResponse } from '../../types/serverResponses';
import { Post } from '../../types/Post';


class PostsStore {
    public posts: Post[] = [];
    public postsLoadingStatus: LoadingStatus = LoadingStatus.NOT_LOADED;
    public tags: string[] = [];
    public areTagsLoading: LoadingStatus = LoadingStatus.NOT_LOADED;

    public constructor() {
        makeObservable(this, {
            posts: observable,
            postsLoadingStatus: observable,
            tags: observable,
            areTagsLoading: observable
        });
    }

    public async updatePosts(): Promise<void> {
        this.postsLoadingStatus = LoadingStatus.LOADING;

        const response: PostsResponse = await API.fetchPosts();

        if (response.success) {
            this.posts = response.posts;
            this.postsLoadingStatus = LoadingStatus.LOADED;
        } else {
            this.postsLoadingStatus = LoadingStatus.ERROR;
        }
    }
}

export default new PostsStore();
