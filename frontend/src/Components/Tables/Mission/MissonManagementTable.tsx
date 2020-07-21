import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { MissionController } from '../../../controllers/mission.controller';

export const MissonManagementTable =
    TableFactory.create('ניהול משימות', MissionController, tableColumns);