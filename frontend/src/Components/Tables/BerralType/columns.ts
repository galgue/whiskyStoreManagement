import { BerralType } from './../../../entity/BerralType';
import { Column } from 'material-table';

export const tableColumns: Array<Column<BerralType>> = [
    {
        title: 'מק"ט סוג חבית', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'שם', field: 'name',
    },
    {
        title: 'נפח', field: 'volume', type: 'numeric',
    },
    {
        title: 'סוג עץ', field: 'oakType',
    },
    {
        title: 'כמות', field: 'quantity', type: 'numeric',
    },
]