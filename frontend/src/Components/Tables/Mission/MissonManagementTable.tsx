import { tableColumns, userTableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { MissionController } from '../../../controllers/mission.controller';
import { isValid, Mission } from '../../../entity/Mission';
import { workerTableOptions } from '../options/managerTableOptions';
import { AxiosResponse } from 'axios';


export const MissonOfUserTable = (getMissions: () => Promise<AxiosResponse<Mission[]>>, height: number) =>
    TableFactory.create('ניהול משימות', MissionController, userTableColumns, isValid, 
        {...workerTableOptions, getRowDataFromServer: getMissions, height: height });

export const MissonManagementTable =
    TableFactory.create('ניהול משימות', MissionController, tableColumns, isValid);