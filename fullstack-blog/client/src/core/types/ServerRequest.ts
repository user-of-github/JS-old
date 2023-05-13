export interface ServerRequest {
    method: 'get' | 'post' | 'delete';
    body?: object;
    path: string;
}
