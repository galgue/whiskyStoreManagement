import { User } from './../entity/User';
import { CommonController, commonControllerFactory } from './commonController';
import storeAxios from '../storeAxios';
import { AxiosResponse } from 'axios';

interface loginProps extends CommonController<User> {
    login: (email: String, password: String) => Promise<AxiosResponse<boolean>>,
}

export const UserController:loginProps = {
    ...new commonControllerFactory<User>().create('users'),
    login: (email: String, password: String) => storeAxios.post<boolean>(`users/login`, { email, password }),
}