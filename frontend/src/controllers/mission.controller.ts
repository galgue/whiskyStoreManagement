import { Mission } from './../entity/Mission';
import { CommonController, commonControllerFactory } from './commonController';

interface missionProps extends CommonController<Mission> {
}

export const MissionController:missionProps = {
    ...new commonControllerFactory<Mission>().create('mission'),
}