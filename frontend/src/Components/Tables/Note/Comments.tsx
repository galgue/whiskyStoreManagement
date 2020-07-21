import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { NoteController } from '../../../controllers/note.controller';

export const CommentsTable =
    TableFactory.create('הערות', NoteController, tableColumns);