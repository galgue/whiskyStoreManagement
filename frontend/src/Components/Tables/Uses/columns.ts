import { UserController } from './../../../controllers/users.controller';
import { BerralBatchController } from './../../../controllers/berralBatch.controller';
import { Use } from './../../../entity/Uses';
import { Column } from 'material-table';
import { SelectEdit } from '../Cell-Randers/Select';

export const tableColumns: Array<Column<Use>> =
        [
            {
                title: 'מק"ט שימוש', field: 'id', removable: false, editable: 'never'
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
                title: 'מטרת השימוש', field: 'purpose',removable: false,
            },
            {
                title: 'כמות השימוש', field: 'quantity',type:'numeric',removable: false,
            },
            {
                title: 'מספר עובד כותב השימוש', field: 'creatorId', type:'numeric', removable: false,
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