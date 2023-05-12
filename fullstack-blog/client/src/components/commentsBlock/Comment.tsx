import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Comment } from '../../core/types/Comment';


interface CommentProps {
    isLoading: boolean;
    comment: Comment;

}

export const SingleComment = (props: CommentProps): JSX.Element => (
    <article>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {props.isLoading ? (
                    <Skeleton variant="circular" width={40} height={40}/>
                ) : (
                    <Avatar alt={props.comment.user.name} src={props.comment.user.avatarUrl}/>
                )}
            </ListItemAvatar>
            {props.isLoading ? (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Skeleton variant="text" height={25} width={120}/>
                    <Skeleton variant="text" height={18} width={230}/>
                </div>
            ) : (
                <ListItemText
                    primary={props.comment.user.name}
                    secondary={props.comment.text}
                />
            )}
        </ListItem>
        <Divider variant="inset" component="li"/>
    </article>
);
