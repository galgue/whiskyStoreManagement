import { ProssesChainController } from './../../../controllers/prossesChain.controller';
import { BerralTypeController } from './../../../controllers/berralType.controller';
import { BerralBatch } from './../../../entity/BerralBatch';
import { Column } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';

export const tableColumns: Array<Column<BerralBatch>> = [
    {
        title: 'מק"ט', field: 'id', type: 'numeric', removable: false, editable: 'never'
    },
    {
        title: 'סוג חבית', field: 'berralType.name',removable: false, editable:'never'
    },
    {
        title: 'שם שרשרת', field: 'prossesChain.name',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => ProssesChainController.getAll()
            .then(prosseses => prosseses.data.map(prosses => ({
                key: prosses.id,
                value: `${prosses.id}: ${prosses.name}`
            }))), 
            props.rowData.prossesChainId, 
            (newProssesChainId) => props.onRowDataChange({
                ...props.rowData,
                prossesChainId: newProssesChainId,
            })),
    },
    {
        title: 'תקופת יישון (ימים)**', field: 'agingDuration', type: 'numeric', editable: 'never'

    },
    {
        title: 'כמות נוזל במילוי', field: 'quantityAtFill', type: 'numeric',
    },
    {
        title: 'מק"ט אצוות חבית קודמת**', field: 'lastBerralBatchId',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => BerralBatchController.getAllActive(
                props.rowData.id || -1,
                props.rowData.lastBerralBatchId || -1
                )
            .then(berralbatchs => berralbatchs.map(berralbatch => ({
                key: berralbatch.id,
                value: `${berralbatch.id}`
            }))), 
            props.rowData.lastBerralBatchId || 0, 
            (newBerralBatchId) => props.onRowDataChange({
                ...props.rowData,
                lastBerralBatchId: newBerralBatchId || null,
            })),
    },
    {
        title: 'אחוז אלכוהול במילוי**', field: 'alcoholPercentage', type: 'numeric',
    },
    {
        title: 'סוג תזקיק', field: 'spiritType',
    },
    {
        title: 'בעלים', field: 'ownership',

    },
    {
        title: 'מיקום חבית במחסן**', field: 'locationatWarehouse',
    },
    {
        title: 'תאריך התחלה', field: 'createdAt', type: 'date',
    },
    {
        title: 'תאריך סיום', field: 'endDate', type: 'date', editable: 'onUpdate'
    },
    {
        title: 'פעילה', field: 'isActive', type: 'boolean', editable: 'never'
    }
]