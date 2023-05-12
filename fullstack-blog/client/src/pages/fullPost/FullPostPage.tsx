import { PostViewer } from '../../components/postViewer/PostViewer';
import { AddComment } from '../../components/addComment/AddComment';
import {CommentsBlock} from '../../components/commentsBlock/CommentsBlock';

export const FullPostPage = (): JSX.Element => {
    return (
        <>
            <PostViewer
                post={{
                    _id: '1',
                    title: 'Roast the code #1 | Rock Paper Scissors',
                    imageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png',
                    author: {
                        avatarUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                        name: 'Keff'
                    },
                    createdAt: '12 июня 2022 г.',
                    viewsCount: 150,
                    commentsCount: 3,
                    tags: ['react', 'fun', 'typescript']
                }}
                isLoading={false}
            />
            <CommentsBlock
                comments={[
                    {
                        user: {
                            name: 'Вася Пупкин',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
                        },
                        text: 'Это тестовый комментарий 555555'
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
            >
                <AddComment/>
            </CommentsBlock>
        </>
    );
};
