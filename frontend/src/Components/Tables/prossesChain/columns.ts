import { ProssesChain } from './../../../entity/ProssesChain';
import { ProssesController } from './../../../controllers/prosses.controller';
import { Prosses } from './../../../entity/Prosses';
import { Column, EditComponentProps } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';

export const tableColumns: Array<Column<ProssesChain>> = [
    {
        title: 'מק"ט שרשרת תהליך', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'שם שרשרת תהליך', field: 'name',validate:(rowData)=>!!rowData.name
    },
    {
        title: 'תיאור שרשרת תהליך', field: 'description',validate:(rowData)=>!!rowData.description
    },
    {
        title: 'מספר תהליכים', field: 'numberOfProsseses', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'תהליך 1', field: 'prossesId1',removable: false, 
        editComponent: (props: EditComponentProps<ProssesChain>) => 
            SelectEdit(() => ProssesController.getAll()
            .then(prosseses => prosseses.data.map(prosses => ({
                key: prosses.id,
                value: `${prosses.id}: ${prosses.name}`
            }))), 
            props.rowData.prossesId1, 
            (newprossesId) => props.onRowDataChange({
                ...props.rowData,
                prossesId1: newprossesId,
            })),
    },
    {
        title: 'תהליך 2', field: 'prossesId2',removable: false, 
        editComponent: (props: EditComponentProps<ProssesChain>) => 
            SelectEdit(() => ProssesController.getAll()
            .then(prosseses => prosseses.data.map(prosses => ({
                key: prosses.id,
                value: `${prosses.id}: ${prosses.name}`
            }))), 
            props.rowData.prossesId2, 
            (newprossesId) => props.onRowDataChange({
                ...props.rowData,
                prossesId2: newprossesId,
            })),
    },
    {
        title: 'תהליך 3', field: 'prossesId3',removable: false, 
        editComponent: (props: EditComponentProps<ProssesChain>) => 
            SelectEdit(() => ProssesController.getAll()
            .then(prosseses => prosseses.data.map(prosses => ({
                key: prosses.id,
                value: `${prosses.id}: ${prosses.name}`
            }))), 
            props.rowData.prossesId3, 
            (newprossesId) => props.onRowDataChange({
                ...props.rowData,
                prossesId3: newprossesId,
            })),
    },
    {
        title: 'תהליך 4', field: 'prossesId4',removable: false, 
        editComponent: (props: EditComponentProps<ProssesChain>) => 
            SelectEdit(() => ProssesController.getAll()
            .then(prosseses => prosseses.data.map(prosses => ({
                key: prosses.id,
                value: `${prosses.id}: ${prosses.name}`
            }))), 
            props.rowData.prossesId4, 
            (newprossesId) => props.onRowDataChange({
                ...props.rowData,
                prossesId4: newprossesId,
            })),
    },
]