import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MaterialTable, { MTableCell, Column, Options } from 'material-table';
import { Mission } from '../../entity/Mission';
import { TableFactory } from '../Tables/TableFactory';
import { MissionController } from '../../controllers/mission.controller';
import { tableColumns } from '../Tables/Note/columns';
import { managerTableOptions, workerTableOptions } from '../Tables/options/managerTableOptions';
import { isValid } from '../../entity/Note';
import { Note } from '../../entity/Note';
import { NoteController } from '../../controllers/note.controller';
import { BerralBatchController } from '../../controllers/berralBatch.controller';

const useStyles = makeStyles({
    button: {
        marginTop: '1em'
    },
    message: {
        textAlign: 'center',
        padding:'1em'
    },
    title:{
        paddingTop:'1em',
        textAlign:'center'
    }
});

export interface SimpleDialogProps {
    open: boolean;
    data: Note[];
    onOpen: (isOpen: boolean) => void;
    onFinish: () => void;
    batchId: number;
}

export const CommentsDialog = (props: SimpleDialogProps) => {
    const classes = useStyles();
    const { open, onOpen, onFinish, batchId } = props;

    const getData = () => {
        return BerralBatchController.get(batchId).then(res => res.data.notes || []);
    }

    let table:() => JSX.Element = TableFactory.create('הערות', NoteController, tableColumns, isValid, 
        { ...workerTableOptions, getRowData: getData, onFinish });
   
    return (<>
        <Dialog aria-labelledby="simple-dialog-title" open={open} 
            fullWidth={true} maxWidth={'md'}>
            {table()}
            <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
        </Dialog>
        </>
    );
}