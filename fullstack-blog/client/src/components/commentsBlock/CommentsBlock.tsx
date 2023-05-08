import List from '@mui/material/List';
import { SideBlock } from '../sideBlock/SideBlock';
import { Comment } from '../../types/Comment';
import { SingleComment } from './Comment';


interface CommentsBlockProps {
    children: JSX.Element | JSX.Element[];
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentsBlock = ({comments, children, isLoading = true}: CommentsBlockProps) => {
    return (
        <SideBlock title="Comments">
            <List>
                {
                    (isLoading ? [...Array(5)] : comments).map((comment: Comment, index: number) => (
                        <SingleComment isLoading={isLoading} comment={comment} key={index}/>
                    ))
                }
            </List>
            <>{children}</>
        </SideBlock>
    );
};
