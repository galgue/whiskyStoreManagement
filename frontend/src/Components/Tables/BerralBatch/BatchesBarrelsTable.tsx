import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';
import { isValid } from '../../../entity/BerralBatch';
import { useSelector } from 'react-redux';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';
import { stateProps } from '../../../interfaces';



export const BatchesTable = () =>{

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);

    return TableFactory.create('אצוות חביות', BerralBatchController, tableColumns,
        isValid,
        isManager? managerTableOptions: workerTableOptions)();
}