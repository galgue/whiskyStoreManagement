import { tableColumns } from './columns';
import { BerralTypeController } from '../../../controllers/berralType.controller';
import { TableFactory } from '../TableFactory';
import { isValid } from '../../../entity/BerralType';
import { useSelector } from 'react-redux';
import { stateProps } from '../../interfaces';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';

export const BarrelTypeManagementTable = () =>{

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);

    return TableFactory.create('ניהול סוגי חביות', BerralTypeController, tableColumns, 
        isValid,
        isManager? managerTableOptions: workerTableOptions)();
}
