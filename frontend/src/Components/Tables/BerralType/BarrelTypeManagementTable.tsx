import { tableColumns } from './columns';
import { BerralTypeController } from '../../../controllers/berralType.controller';
import { TableFactory } from '../TableFactory';

export const BarrelTypeManagementTable = 
    TableFactory.create('ניהול סוגי חביות', BerralTypeController, tableColumns);