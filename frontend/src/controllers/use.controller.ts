import { Use } from './../entity/Uses';
import { CommonController, commonControllerFactory } from './commonController';

interface UseProps extends CommonController<Use> {
}

export const UseController:UseProps = {
    ...new commonControllerFactory<Use>().create('use'),
}