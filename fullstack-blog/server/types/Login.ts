import { User } from './User';
import { SuccessfulResponse, UnsuccessfulResponse } from './SuccessResponse';

export interface LoginRequest {
    email: string;
    password: string;
}

type SuccessfulLoginResponse = SuccessfulResponse & { user: Partial<User>, token: string }
export type LoginResponse = SuccessfulLoginResponse | UnsuccessfulResponse
