import { User } from './User';

export interface LoginRequest {
    email: string;
    password: string;
}

export type LoginResponse = {
    success: true;
    token: string;
    user: Partial<User>
} | {
    success: false;
    error: string;
}
