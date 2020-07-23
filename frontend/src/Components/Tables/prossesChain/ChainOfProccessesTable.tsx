import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesChainController } from '../../../controllers/prossesChain.controller';
import { isValid } from '../../../entity/ProssesChain';



export const ChainOfProccessesTable =
    TableFactory.create('ניהול שרשראות תהליכים', ProssesChainController, tableColumns, isValid);
