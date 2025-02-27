import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { PostSkeleton } from './Skeleton';
import { Post } from '../../core/types/Post';
import { UserInfo } from '../userInfo/UserInfo';
import styles from './PostViewer.module.scss';
import { Link } from 'react-router-dom';


type PostViewerProps =
    { isLoading: true } |
    {
        isLoading?: false,
        post: Post,
        isFullPost: boolean,
        children?: JSX.Element | JSX.Element[] | string
    };

export const PostViewer = (props: PostViewerProps) => {
    if (props.isLoading) {
        return <PostSkeleton/>;
    }

    const onClickRemove = (): void => {
    };

    return (
        <article className={clsx(styles.root, {[styles.rootFull]: props.isFullPost})}>
            {props.post.isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${props.post._id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}
            {props.post.imageUrl && (
                <img
                    className={clsx(styles.image, {[styles.imageFull]: props.isFullPost})}
                    src={props.post.imageUrl}
                    alt={props.post.title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo user={props.post.author} additionalText={props.post.createdAt}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: props.isFullPost})}>
                        {props.isFullPost ? props.post.title : <Link to={`/posts/${props.post._id}`}>{props.post.title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {(props.post.tags || []).map((name) => (
                            <li key={name}>
                                <Link to={`/tag/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {props.children && <div className={styles.content}>{props.children}</div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{props.post.viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>{props.post.commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
};
