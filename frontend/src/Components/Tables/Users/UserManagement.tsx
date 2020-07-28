import { TableFactory } from '../TableFactory';
import { UserController } from '../../../controllers/users.controller';
import { tableColumns } from './columns';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';
import { useSelector } from 'react-redux';
import { stateProps } from '../../interfaces';
import { isValid } from '../../../entity/User';


export const UserManagementTable = () =>{

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);

    return TableFactory.create('ניהול משתמשים', UserController, tableColumns, isValid,
        isManager? managerTableOptions: workerTableOptions)();
}