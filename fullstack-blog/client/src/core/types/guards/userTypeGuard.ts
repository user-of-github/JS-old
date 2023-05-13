import { User } from '../User';

export const userTypeGuard = (user: unknown): user is User => {
    return user !== null && typeof user === 'object' && 'name' in user;
}
