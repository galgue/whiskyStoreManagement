import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';

export const BatchesTable =
    TableFactory.create('אצוות חביות', BerralBatchController, tableColumns);