import { BerralBatch } from './../entity/BerralBatch';
import { CommonController, commonControllerFactory } from './commonController';

interface berralTypeProps extends CommonController<BerralBatch> {
}

export const BerralBatchController:berralTypeProps = {
    ...new commonControllerFactory<BerralBatch>().create('berral-batch'),
}