export interface ServerRequest {
    method: 'get' | 'post' | 'delete';
    body?: object;
    path: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
