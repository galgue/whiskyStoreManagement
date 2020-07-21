import { Note } from './../../../entity/Note';
import { Column } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';
import { UserController } from '../../../controllers/users.controller';

export const tableColumns: Array<Column<Note>> = [
    {
        title: 'מק"ט הערה', field: 'id',removable: false, editable: 'never'
    },
    {
        title: 'מק"ט אצוות חבית', field: 'berralBatchId',removable: false, 
        editComponent: (props) => 
        SelectEdit(() => BerralBatchController.getAll()
            .then(berralBatchs => berralBatchs.data.map(berralBatch => ({
                key: berralBatch.id,
                value: `${berralBatch.id}`
            }))), 
            props.rowData.berralBatchId, 
            (newBerralBatchId) => props.onRowDataChange({
                ...props.rowData,
                berralBatchId: newBerralBatchId,
            }))
    },
    {
        title: 'הערה', field: 'content',removable: false,
    },
    {
        title: 'מספר עובד כותב הערה', field: 'creatorId', type:'numeric', removable: false,
        editComponent: (props) => 
                SelectEdit(() => UserController.getAll()
                .then(users => users.data.map(user => ({
                    key: user.id,
                    value: `${user.id}: ${user.firstName} ${user.lastName}`
                }))), 
                props.rowData.creatorId, 
                (newCreatorId) => props.onRowDataChange({
                    ...props.rowData,
                    creatorId: newCreatorId,
                }))
    },
]