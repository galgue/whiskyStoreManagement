import { Note } from './../entity/Note';
import { CommonController, commonControllerFactory } from './commonController';

interface NoteProps extends CommonController<Note> {
}

export const NoteController:NoteProps = {
    ...new commonControllerFactory<Note>().create('note'),
}