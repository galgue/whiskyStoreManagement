import { Options } from 'material-table';
export const tableOptions: Options<any> = {
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