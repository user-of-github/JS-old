import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import { SideBlock } from '../sideBlock/SideBlock';


interface TagsBlockProps {
    tags: string[];
    isLoading?: boolean;
}

export const TagsBlock = ({tags, isLoading = true}: TagsBlockProps): JSX.Element => {
    return (
        <SideBlock title="Tags">
            <List>
                {(isLoading ? [...Array(5)] : tags).map((tag: string, index: number) => (
                    <Link key={index}
                          style={{textDecoration: 'none', color: 'black'}}
                          to={`/tags/${name}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon/>
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100}/>
                                ) : (
                                    <ListItemText primary={tag}/>
                                )}
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </SideBlock>
    );
};
