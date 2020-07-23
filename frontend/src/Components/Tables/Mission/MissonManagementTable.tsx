import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { MissionController } from '../../../controllers/mission.controller';
import { isValid } from '../../../entity/Mission';


export const MissonManagementTable =
    TableFactory.create('ניהול משימות', MissionController, tableColumns, isValid);