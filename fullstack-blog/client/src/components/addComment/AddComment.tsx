import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import styles from './AddComment.module.scss';

export const AddComment = (): JSX.Element => {
    return (
        <>
            <form className={styles.content}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src="https://mui.com/static/images/avatar/5.jpg"
                />
                <div className={styles.form}>
                    <TextField
                        label="Write a comment"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button variant="contained">Send</Button>
                </div>
            </form>
        </>
    );
};
