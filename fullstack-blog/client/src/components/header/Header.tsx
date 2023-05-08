import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export const Header = (): JSX.Element => {
    const isAuthenticated: boolean = false;
    const onLogOutClick = (): void => {
    };


    return (
        <header className={styles.header}>
            <Container maxWidth="lg">
                <div className={styles.content}>
                    <a className={styles.logo} href="/">
                        FULL-STACK MERN BLOG
                    </a>

                    <div className={styles.buttons}>
                        {isAuthenticated ? (
                            <>
                                <a href="/posts/create">
                                    <Button variant="contained">Create a post</Button>
                                </a>
                                <Button onClick={onLogOutClick} variant="contained" color="error">
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <a href="/login">
                                    <Button variant="outlined">Log In</Button>
                                </a>
                                <a href="/register">
                                    <Button variant="contained">Create an account</Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};
