import styles from './App.module.scss';
import { Header } from './header/Header';
import { AddComment } from './createPost/AddComment';


export const App = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Header/>
            <AddComment/>
        </div>
    );
};
