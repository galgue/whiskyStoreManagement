import { AxiosResponse } from 'axios';
import { Mission } from './../entity/Mission';
import { CommonController, commonControllerFactory } from './commonController';
import storeAxios from '../storeAxios';

interface missionProps extends CommonController<Mission> {
    getOfUser: () => Promise<AxiosResponse<Mission[]>>
}

export const MissionController:missionProps = {
    ...new commonControllerFactory<Mission>().create('mission'),
    getOfUser: () => storeAxios.get<Mission[]>(`mission/user`),
}