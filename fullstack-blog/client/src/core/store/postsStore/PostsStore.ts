import { makeObservable, observable } from 'mobx';
import { LoadingStatus } from '../../types/LoadingStatus';
import { API } from '../../api';
import { PostsResponse } from '../../types/serverResponses';


class PostsStore {
    public posts: PostsStore[] = [];
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
        const updatedData: PostsResponse = await API.fetchPosts();
        console.log(updatedData);
    }
}

export default new PostsStore();
