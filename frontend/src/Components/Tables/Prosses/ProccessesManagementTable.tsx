import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesController } from '../../../controllers/prosses.controller';

export const ProccessesManagementTable =
    TableFactory.create('ניהול תהליכים', ProssesController, tableColumns);