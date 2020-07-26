import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { BerralBatch } from '../../../entity/BerralBatch';
import { isValid } from '../../../entity/Uses';
import { stateProps } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';
import { UseController } from '../../../controllers/use.controller';

export const UsesOfBerralBatch = (berralBatch: BerralBatch) => {

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);

    const options = isManager? managerTableOptions: workerTableOptions;

    return TableFactory.create('אצוות חביות', UseController, tableColumns,
        isValid,)();
        // {...options, rowData: () => Promise.resolve(berralBatch.uses)})();
}