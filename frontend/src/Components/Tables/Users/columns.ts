import { User } from './../../../entity/User';
import { Column } from 'material-table';

export const tableColumns: Array<Column<User>> = [
    {
        title: 'מספר עובד', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'שם פרטי', field: 'firstName',
    },
    {
        title: 'שם משפחה', field: 'lastName',
    },
    {
        title: 'מחלקה', field: 'department',removable: false,
    },
    {
        title: 'האם מנהל', field: 'isManager',removable: false, type: 'boolean'
    },
    {
        title: 'מספר טלפון', field: 'phone',removable: false,
    },
    {
        title: 'מייל', field: 'email',removable: false,
    },
    {
        title: 'סיסמא', field: 'password',removable: false,
    }
]