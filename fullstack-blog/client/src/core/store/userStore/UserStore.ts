import { action, makeObservable, observable, runInAction } from 'mobx';
import { LoginRequest } from '../../types/ServerRequest';
import { User } from '../../types/User';
import { userTypeGuard } from '../../types/guards/userTypeGuard';
import { LoginResponse } from '../../types/serverResponses';
import { API } from '../../api';

class UserStore {
    private static LOCAL_STORAGE_USER_KEY = 'current_authorized_user';
    private static LOCAL_STORAGE_TOKEN_KEY = 'user_jwt_token';

    public user: User | null = null;
    public token: string | null = null;

    public constructor() {
        runInAction(() => {
            this.user = UserStore.tryGetSavedUser();
            this.token = UserStore.tryGetSavedToken();
        });

        makeObservable(this, {
            user: observable,
            token: observable,
            tryAuthorize: action.bound,
            logOut: action.bound
        });
    }

    public async tryAuthorize(data: LoginRequest): Promise<void> {
        const response: LoginResponse = await API.login(data);

        if (!response.success) {
            return;
        }

        runInAction(() => {
            this.user = response.user;
            this.token = response.token;
        });

        this.saveUserAndToken();
    }

    public logOut(): void {
        runInAction(() => {
            this.user = null;
            this.token = null;
        });

        this.clearLocalStorageData();
    }

    private static tryGetSavedUser(): User | null {
        try {
            const tryGet: string | null = localStorage.getItem(UserStore.LOCAL_STORAGE_USER_KEY);

            if (!tryGet) {
                return null;
            }

            const parsedUser: User = JSON.parse(tryGet);

            if (!userTypeGuard(parsedUser)) {
                return null;
            }

            return parsedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private static tryGetSavedToken(): string | null {
        try {
            const tryGet: string | null = localStorage.getItem(UserStore.LOCAL_STORAGE_TOKEN_KEY);

            if (!tryGet) {
                return null;
            }

            return tryGet;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private saveUserAndToken(): void {
        try {
            this.user && localStorage.setItem(UserStore.LOCAL_STORAGE_USER_KEY, JSON.stringify(this.user));
            this.token && localStorage.setItem(UserStore.LOCAL_STORAGE_USER_KEY, this.token);
        } catch (error) {
            console.error(error);
        }
    }

    private clearLocalStorageData(): void {
        try {
            localStorage.removeItem(UserStore.LOCAL_STORAGE_TOKEN_KEY);
            localStorage.removeItem(UserStore.LOCAL_STORAGE_USER_KEY);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new UserStore();
