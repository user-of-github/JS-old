import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
    const isAuthenticated: boolean = false;
    const onLogOutClick = (): void => {
    };


    return (
        <header className={styles.header}>
            <Container maxWidth="lg">
                <div className={styles.content}>
                    <Link className={styles.logo} to="/">
                        FULL-STACK MERN BLOG
                    </Link>

                    <nav className={styles.buttons}>
                        {isAuthenticated ? (
                            <>
                                <Link to="/posts/create-post">
                                    <Button variant="contained">Create a post</Button>
                                </Link>
                                <Button onClick={onLogOutClick} variant="contained" color="error">
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <Button variant="outlined">Log In</Button>
                                </Link>
                                <Link to="/auth/register">
                                    <Button variant="contained">Create an account</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </Container>
        </header>
    );
};
