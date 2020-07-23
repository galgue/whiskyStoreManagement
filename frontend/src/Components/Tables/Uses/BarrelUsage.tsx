import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { UseController } from '../../../controllers/use.controller';
import { isValid } from '../../../entity/Uses';


export const BarrelUsageTable =
    TableFactory.create('שימושי אצוות חבית', UseController, tableColumns, isValid);