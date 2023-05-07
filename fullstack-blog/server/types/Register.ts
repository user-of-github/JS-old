import { User } from './User';
import { SuccessfulResponse, UnsuccessfulResponse } from './SuccessResponse';

export interface RegisterRequest {
    email: string;
    name: string;
    avatarUrl?: string;
    password: string;
}

type SuccessfulRegister = SuccessfulResponse & { user: Partial<User>, token: string };
export type RegisterResponse = UnsuccessfulResponse | SuccessfulRegister;
