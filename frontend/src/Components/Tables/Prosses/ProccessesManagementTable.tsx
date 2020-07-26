import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesController } from '../../../controllers/prosses.controller';
import { isValid } from '../../../entity/Prosses';
import { useSelector } from 'react-redux';
import { stateProps } from '../../../interfaces';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';


export const ProccessesManagementTable = () => {
    const isManager = useSelector((state: stateProps) => state.appState.loggedUser?.isManager || false);
   return TableFactory.create('ניהול תהליכים', ProssesController, tableColumns, isValid,
     isManager ? managerTableOptions : workerTableOptions)();
}