import { User } from '../../core/types/User';
import styles from './UserInfo.module.scss';


interface UserInfoProps {
    user: User;
    additionalText: string;
}

export const UserInfo = (props: UserInfoProps): JSX.Element => {
    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={props.user.avatarUrl || '/noavatar.png'} alt={props.user.name}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{props.user.name}</span>
                <span className={styles.additional}>{props.additionalText}</span>
            </div>
        </div>
    );
};
