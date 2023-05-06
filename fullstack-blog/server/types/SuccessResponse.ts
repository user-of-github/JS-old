export interface SuccessfulResponse {
    success: true;
}

export interface UnsuccessfulResponse {
    success: false;
    error: string | string[];
}

export type OnlySuccessStatusResponse = SuccessfulResponse | UnsuccessfulResponse;
