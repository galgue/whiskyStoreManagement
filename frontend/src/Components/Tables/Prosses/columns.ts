import { BerralTypeController } from './../../../controllers/berralType.controller';
import { Prosses } from './../../../entity/Prosses';
import { Column } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';

export const tableColumns: Array<Column<Prosses>> = [
    {
        title: 'מק"ט תהליך', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'שם תהליך', field: 'name',validate:(rowData)=>!!rowData.name
    },
    {
        title: 'תיאור תהליך', field: 'description',validate:(rowData)=>!!rowData.description
    },
    {
        title: 'משך (ימים)', field: 'duration', type: 'numeric', removable: false,validate:(rowData)=>!!rowData.duration
    },
    {
        title: 'סוג חבית', field: 'berralType.name',removable: false,
        editComponent: (props) => 
        SelectEdit(() => BerralTypeController.getAll()
            .then(berralTypes => berralTypes.data.map(berralType => ({
                key: berralType.id,
                value: `${berralType.name}`
            }))), 
            props.rowData.berralTypeId, 
            (newBerralTypeId) => props.onRowDataChange({
                ...props.rowData,
                berralTypeId: newBerralTypeId,
            }))
    },
]