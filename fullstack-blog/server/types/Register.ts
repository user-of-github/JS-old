import { User } from './User';
import { success } from 'concurrently/dist/src/defaults';

export interface RegisterRequest {
    email: string;
    name: string;
    avatarUrl?: string;
    password: string;
}


export type RegisterResponse = {
    success: false;
    errors: string[];
} | {
    success: true;
    user: Partial<User>;
    token: string;
}
