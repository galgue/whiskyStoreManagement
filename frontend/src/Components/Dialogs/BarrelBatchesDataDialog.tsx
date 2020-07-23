import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { BerralBatch } from '../../entity/BerralBatch';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  open: boolean;
  rowData:BerralBatch;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { rowData, open } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">נתוני אצוות חבית</DialogTitle>
       {rowData ? rowData.id:''}
    </Dialog>
  );
}