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
    filterCellStyle:{
        textAlign: 'right'
    },
    filtering: true,
    pageSize:20
}

export const MiniTableOptions: Options<any> = {
    draggable: false,
    headerStyle: {
        textAlign: 'right'
    },
    filterCellStyle:{
        textAlign: 'right'
    },
    exportButton: false,
    searchFieldAlignment: "left",
    filtering: true,
    pageSize:20
}