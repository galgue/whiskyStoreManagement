import { User } from './../entity/User';
import { CommonController, commonControllerFactory } from './commonController';
import storeAxios from '../storeAxios';
import { AxiosResponse } from 'axios';

interface loginProps extends CommonController<User> {
    login: (email: String, password: String) => Promise<AxiosResponse<{userName: String, isManager: Boolean}>>,
    isLogged: () => Promise<AxiosResponse<{userName: String, isManager: Boolean}>>,
    logut: () => Promise<AxiosResponse<void>>,

}

export const UserController:loginProps = {
    ...new commonControllerFactory<User>().create('users'),
    login: (email: String, password: String) => storeAxios.post<{userName: String, isManager: Boolean}>(`users/login`, { email, password }),
    isLogged: () => storeAxios.post<{userName: String, isManager: Boolean}>('users/islogged'),
    logut: () => storeAxios.post<void>('users/logout'),
}