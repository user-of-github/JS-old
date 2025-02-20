import { ServerRequest } from '../types/ServerRequest';
import axios from '../axios';

export const requestToServer = async <ResponseType extends object>(data: ServerRequest): Promise<ResponseType | null> => {
    try {
        const response: ResponseType = (await axios[data.method](data.path, data.body)).data;


        if ('success' in response && !response.success && 'error' in response) {
            console.error(response.error);
        }

        return response;
    } catch (error: any) {
        console.log(error);
        return null;
    }
};
