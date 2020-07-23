import { AxiosResponse } from 'axios';
import { BerralBatch } from './../entity/BerralBatch';
import { CommonController, commonControllerFactory } from './commonController';
import storeAxios from '../storeAxios';

interface berralTypeProps extends CommonController<BerralBatch> {
    getCount: (type: BerralBatchCounterBy) => Promise<{key: string, value: number}[]>
    getStatistic: (type: BerralBatchStatisticsBy) => Promise<{key: string, value: number}[]>
    getMonthChange: () => Promise<{lastMonth: number, thisMonth: number}>
}

export type BerralBatchCounterBy = 'quarters' | 'years' | 'months';
export type BerralBatchStatisticsBy = 'berral-type' | 'prosses-chain' | 'spirit-type';

export const BerralBatchController:berralTypeProps = {
    ...new commonControllerFactory<BerralBatch>().create('berral-batch'),
    getCount: (type) => 
        storeAxios.get<{key: string, value: number}[]>(`berral-batch/count/${type}`).then(result => result.data),
    getStatistic: (type) => 
        storeAxios.get<{key: string, value: number}[]>(`berral-batch/statistic/${type}`).then(result => result.data),
    getMonthChange: () => 
        storeAxios.get<{lastMonth: number, thisMonth: number}>(`berral-batch/monthChange`).then(result => result.data),
}