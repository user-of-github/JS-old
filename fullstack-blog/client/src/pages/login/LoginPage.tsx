import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { LoginRequest } from '../../core/types/ServerRequest';
import { useUserStore } from '../../core/store/userStore/UserStoreContext';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export const LoginPage = observer((): JSX.Element => {

    const userStore = useUserStore();

    const { register, handleSubmit, formState: {errors}} = useForm<LoginRequest>({
        defaultValues: {email: '', password: ''}, mode: 'onBlur'
    });

    const onSubmit = (values: LoginRequest) => {
        userStore.tryAuthorize(values);
    };

    if (userStore.user) {
        return <Navigate to="/"/>;
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Log In your account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    { ...register('email', {required: 'Insert email' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Password"
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    { ...register('password', {required: 'Insert password' })}
                    fullWidth
                />
                <Button type="submit" size="large" variant="contained" fullWidth>Log In</Button>
            </form>
        </Paper>
    );
});
