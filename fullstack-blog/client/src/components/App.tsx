import styles from './App.module.scss';
import { Header } from './header/Header';


export const App = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Header/>
        </div>
    );
};
