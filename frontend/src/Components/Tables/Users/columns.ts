import { User } from './../../../entity/User';
import { Column } from 'material-table';

export const tableColumns: Array<Column<User>> = [
    {
        title: 'מספר עובד', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'שם פרטי', field: 'firstName',validate:(rowData)=>!!rowData.firstName
    },
    {
        title: 'שם משפחה', field: 'lastName',validate:(rowData)=>!!rowData.lastName
    },
    {
        title: 'מחלקה', field: 'department',removable: false,validate:(rowData)=>!!rowData.department
    },
    {
        title: 'האם מנהל', field: 'isManager',removable: false, type: 'boolean'
    },
    {
        title: 'מספר טלפון', field: 'phone',removable: false,validate:(rowData)=>!!rowData.phone
    },
    {
        title: 'מייל', field: 'email',removable: false,validate:(rowData)=>!!rowData.email
    },
    {
        title: 'סיסמא', field: 'password',removable: false,validate:(rowData)=>!!rowData.password
    }
]