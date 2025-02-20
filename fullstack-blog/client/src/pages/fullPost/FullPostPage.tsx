import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { PostViewer } from '../../components/postViewer/PostViewer';
import { AddComment } from '../../components/addComment/AddComment';
import { CommentsBlock } from '../../components/commentsBlock/CommentsBlock';
import { Post } from '../../core/types/Post';
import { usePostsStore } from '../../core/store/postsStore/PostsStoreContext';


export const FullPostPage = observer((): JSX.Element => {
    const store = usePostsStore();
    const [post, setPost] = React.useState<Post | null>(null);
    const {id} = useParams();

    if (typeof id !== 'string') {
        return <></>;
    }

    const loadPost = async (): Promise<void> => {
        const loadedPost = await store.getPostById(id || '');
        setPost(loadedPost);
    };

    React.useEffect(() => void loadPost(), []);

    return (
        <>
            {
                post
                    ?
                    <PostViewer post={post} isLoading={false} isFullPost={true}>{post.text}</PostViewer>
                    :
                    <PostViewer isLoading={true}/>
            }
            <CommentsBlock comments={[]} isLoading={false}>
                <AddComment/>
            </CommentsBlock>
        </>
    );
});
