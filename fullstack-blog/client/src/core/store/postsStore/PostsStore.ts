import { action, makeObservable, observable } from 'mobx';
import { LoadingStatus } from '../../types/LoadingStatus';
import { API } from '../../api';
import { PostsResponse, TagsResponse } from '../../types/serverResponses';
import { Post } from '../../types/Post';


class PostsStore {
    public posts: Post[] = [];
    public postsLoadingStatus: LoadingStatus = LoadingStatus.NOT_LOADED;
    public tags: string[] = [];
    public tagsLoadingStatus: LoadingStatus = LoadingStatus.NOT_LOADED;

    public constructor() {
        makeObservable(this, {
            posts: observable,
            postsLoadingStatus: observable,
            tags: observable,
            tagsLoadingStatus: observable,
            updatePosts: action.bound,
            updateTags: action.bound
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

    public async updateTags(): Promise<void> {
        this.tagsLoadingStatus = LoadingStatus.LOADING;

        const response: TagsResponse = await API.fetchTags();
        if (response.success) {
            this.tags = response.tags;
            console.log(this.tags)
            this.tagsLoadingStatus = LoadingStatus.LOADED;
        } else {
            this.tagsLoadingStatus = LoadingStatus.ERROR;
        }
    }

    public async getPostById(id: string): Promise<Post | null> {
        const tryFindLocally: Post | undefined = this.posts.find(post => post._id === id);

        if (tryFindLocally) {
            return tryFindLocally;
        }

        const fetchedPostFromServer = await API.fetchPostById(id);

        console.log(fetchedPostFromServer);

        if (!fetchedPostFromServer.success) {
            console.error(String(fetchedPostFromServer.error));
            return null;
        }

        return fetchedPostFromServer.post as Post;
    }
}

export default new PostsStore();
