import { TableFactory } from '../TableFactory';
import { UserController } from '../../../controllers/users.controller';
import { tableColumns } from './columns';


export const UserManagementTable = 
    TableFactory.create('ניהול משתמשים', UserController, tableColumns, 
        { isRowAdd: false, isRowEdit: false });