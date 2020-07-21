import { Prosses } from './../entity/Prosses';
import { CommonController, commonControllerFactory } from './commonController';

interface prossesProps extends CommonController<Prosses> {
}

export const ProssesController:prossesProps = {
    ...new commonControllerFactory<Prosses>().create('prosses'),
}