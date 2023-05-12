import axios from 'axios';
import { BASE_SERVER_URL } from './constants/serverConstants';


export default axios.create({
    baseURL: BASE_SERVER_URL
});
