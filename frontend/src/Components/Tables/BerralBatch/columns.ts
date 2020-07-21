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
        title: 'סוג חבית', field: 'berralTypeId',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => BerralTypeController.getAll()
            .then(berralTypes => berralTypes.data.map(berralType => ({
                key: berralType.id,
                value: `${berralType.id}: ${berralType.name}`
            }))), 
            props.rowData.berralTypeId, 
            (newBerralTypeId) => props.onRowDataChange({
                ...props.rowData,
                berralTypeId: newBerralTypeId,
            })),
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
        title: 'תקופת יישון', field: 'agingDuration', type: 'numeric',

    },
    {
        title: 'כמות נוזל במילוי', field: 'quantityAtFill', type: 'numeric',
    },
    {
        title: 'מק"ט אצוות חבית קודמת', field: 'lastBerralBatchId',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => BerralBatchController.getAll()
            .then(berralbatchs => berralbatchs.data.map(berralbatch => ({
                key: berralbatch.id,
                value: `${berralbatch.id}`
            }))), 
            props.rowData.lastBerralBatchId || 0, 
            (newBerralBatchId) => props.onRowDataChange({
                ...props.rowData,
                lastBerralBatchId: newBerralBatchId,
            })),
    },
    {
        title: 'אחוז אלכוהול במילוי', field: 'alcoholPercentage', type: 'numeric',
    },
    {
        title: 'סוג תזקיק', field: 'spiritType',
    },
    {
        title: 'בעלים', field: 'ownership',

    },
    {
        title: 'מיקום חבית במחסן', field: 'locationatWarehouse',
    },
]