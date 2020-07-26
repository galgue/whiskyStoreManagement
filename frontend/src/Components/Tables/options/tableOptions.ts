import { Options } from 'material-table';
import { findAllByDisplayValue } from '@testing-library/react';
export const tableOptions: Options<any> = {
   search:false,
    draggable: false,
    headerStyle: {
        textAlign: 'right'
    },
    exportButton: true,
    searchFieldAlignment: "left",
    editCellStyle:{
        textAlign: 'right',
        float:'right'
    },
    filtering: true
}

export const MiniTableOptions: Options<any> = {
    draggable: false,
    headerStyle: {
        textAlign: 'right'
    },
    exportButton: false,
    searchFieldAlignment: "left",
    filtering: true
}