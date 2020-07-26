import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { BerralBatch } from '../../entity/BerralBatch';
import { BerralBatchStatisticsPieChart } from '../Dashboard/common/BerralBatchStatistics';
import { NewBerralBatchesChart } from '../Dashboard/common/NewBerralsBatch';
import { Button } from '@material-ui/core';

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
  onOpen: (isOpen: boolean) => void
}

export function BarrelBatchesChartDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onOpen, open } = props;

  const [toShow, setToShow] = useState<'bar' | 'pie'>('bar');

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">דוחות אצוות חבית</DialogTitle>
      {toShow === 'pie' && <BerralBatchStatisticsPieChart size={{height: 500, width: 500}}/>}
      {toShow === 'bar' && <NewBerralBatchesChart size={{height: 500, width: 500}}/>}
      <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
    </Dialog>
  );
}