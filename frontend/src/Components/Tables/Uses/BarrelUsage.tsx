import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { UseController } from '../../../controllers/use.controller';
import { UserController } from '../../../controllers/users.controller';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';

export const BarrelUsageTable =
    TableFactory.create('שימושי אצוות חבית', UseController, tableColumns);