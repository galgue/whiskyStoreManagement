import { BerralType } from './../entity/BerralType';
import { CommonController, commonControllerFactory } from './commonController';

interface berralTypeProps extends CommonController<BerralType> {
}

export const BerralTypeController:berralTypeProps = {
    ...new commonControllerFactory<BerralType>().create('berral-type'),
}