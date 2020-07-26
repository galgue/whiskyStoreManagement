import { Mission } from './../../../entity/Mission';
import { Column } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';
import { UserController } from '../../../controllers/users.controller';

export const tableColumns: Array<Column<Mission>> = [
    {
        title: 'מזהה', field: 'id', editable: 'never',
    },
    {
        title: 'מק"ט אצוות חבית', field: 'berralBatchId',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => BerralBatchController.getAll()
            .then(berralBatches => berralBatches.data.map(berralBatch => ({
                key: berralBatch.id,
                value: `${berralBatch.id}`
            }))), 
            props.rowData.berralBatchId, 
            (newBerralBatchId) => props.onRowDataChange({
                ...props.rowData,
                berralBatchId: newBerralBatchId,
            })),
    },
    {
        title: 'נושא משימה', field: 'topic',
    },
    {
        title: 'תיאור משימה', field: 'description',
    },
    {
        title: 'יוצר המשימה', field: 'creatorId',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => UserController.getAll()
            .then(users => users.data && users.data.map(user => ({
                key: user.id,
                value: `${user.id}: ${user.firstName} ${user.lastName}`
            }))), 
            props.rowData.creatorId, 
            (newCreatorId) => props.onRowDataChange({
                ...props.rowData,
                creatorId: newCreatorId,
            })),
    },
    {
        title: 'נוצרה בתאריך', field: 'createdOn', type: 'date',
    },
    {
        title: 'מבצע המשימה', field: 'executeById',removable: false, 
        editComponent: (props) => 
            SelectEdit(() => UserController.getAll()
            .then(users => users.data.map(user => ({
                key: user.id,
                value: `${user.id}: ${user.firstName} ${user.lastName}`
            }))), 
            props.rowData.executeById, 
            (newExecutorId) => props.onRowDataChange({
                ...props.rowData,
                executeById: newExecutorId,
            })),
    },
    {
        title: 'תאריך תזכורת', field: 'reminderDate', type: 'date',
    },
    {
        title: 'האם הושלמה', field: 'isCompleted', type: 'boolean',
    },
]

export const userTableColumns: Array<Column<Mission>> = [
    {
        title: 'מק"ט אצוות חבית', field: 'berralBatchId',removable: false, 
    },
    {
        title: 'נושא משימה', field: 'topic',
    },
    {
        title: 'תיאור משימה', field: 'description',
    },
    {
        title: 'תאריך תזכורת', field: 'reminderDate', type: 'date',
    },
    {
        title: 'האם הושלמה', field: 'isCompleted', type: 'boolean',
    },
]