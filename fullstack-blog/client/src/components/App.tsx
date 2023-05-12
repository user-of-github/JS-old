import Container from '@mui/material/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './header/Header';
import styles from './App.module.scss';
import { HomePage } from '../pages/home/HomePage';
import { FullPostPage } from '../pages/fullPost/FullPostPage';
import { AddPostPage } from '../pages/addPost/AddPostPage';
import { LoginPage } from '../pages/login/LoginPage';
import { RegistrationPage } from '../pages/registration/RegistrationPage';


export const App = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Container maxWidth="lg">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/posts/create-post" element={<AddPostPage/>}/>
                        <Route path="/posts/:id" element={<FullPostPage/>}/>

                        <Route path="/auth/login" element={<LoginPage/>}/>
                        <Route path="/auth/register" element={<RegistrationPage/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
};
