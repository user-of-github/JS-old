import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { PostViewer } from '../../components/postViewer/PostViewer';
import { TagsBlock } from '../../components/tagsBlock/TagsBlock';
import { CommentsBlock } from '../../components/commentsBlock/CommentsBlock';
import { observer } from 'mobx-react-lite';
import { usePostsStore } from '../../core/store/postsStore/PostsStoreContext';
import { LoadingStatus } from '../../core/types/LoadingStatus';


const LoadingSkeletonsTemplate = React.memo((): JSX.Element => {
    return (
        <>
            {[...Array(2)].map((_, index) => (
                <PostViewer
                    key={index}
                    isLoading={true}
                />
            ))}
        </>
    );
}, () => true);

export const HomePage = observer(() => {
    const store = usePostsStore();

    React.useEffect((): void => {
        store.updatePosts();
        store.updateTags();
    }, []);

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4} item>
                <Grid xs={8} item>
                    {store.postsLoadingStatus === LoadingStatus.LOADING && <LoadingSkeletonsTemplate/>}
                    {
                        store.postsLoadingStatus === LoadingStatus.LOADED &&
                        <>
                            {store.posts.map(post => <PostViewer isLoading={false} post={post} isFullPost={false} key={post._id}/>)}
                        </>
                    }
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock tags={(store.tags || [])} isLoading={false}/>
                    <CommentsBlock
                        comments={[
                            {
                                user: {
                                    name: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
                                },
                                text: 'Это тестовый комментарий'
                            },
                            {
                                user: {
                                    name: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg'
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top'
                            }
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
});
