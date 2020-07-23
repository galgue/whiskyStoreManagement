import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { NoteController } from '../../../controllers/note.controller';
import { isValid } from '../../../entity/Note';

export const CommentsTable =
    TableFactory.create('הערות', NoteController, tableColumns, isValid);