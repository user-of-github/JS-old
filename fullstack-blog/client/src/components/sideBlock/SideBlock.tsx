import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styles from './SideBlock.module.scss';

interface SideBlockProps {
    title: string;
    children: JSX.Element | JSX.Element[];
}

export const SideBlock = (props: SideBlockProps) => {
    return (
        <Paper classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>{props.title}</Typography>
            {props.children}
        </Paper>
    );
};
