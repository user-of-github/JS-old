import { SuccessfulResponse, UnsuccessfulResponse } from './SuccessResponse';
import { User } from './User';


type SuccessfulAboutMe = SuccessfulResponse & {user: Partial<User>};
export type AboutMeResponse = SuccessfulAboutMe | UnsuccessfulResponse;
