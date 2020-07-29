import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { BerralBatchStatisticsPieChart } from '../Dashboard/common/BerralBatchStatistics';
import { NewBerralBatchesChart } from '../Dashboard/common/NewBerralsBatch';
import { Button, Grid, Paper } from '@material-ui/core';
import { BerralBatchChart } from '../Dashboard/common/BerralBatchChart';

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
  const [toShowTitle, setToShowTitle] = useState('גרף עוגה');

  const changeToShowState = () => {
    if(toShow === 'bar') {
      setToShow('pie');
      setToShowTitle('גרף עמודות')
    } else {
      setToShow('bar');
      setToShowTitle('גרף עוגה')
    }
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">דוחות אצוות חבית</DialogTitle>
      <Button color='primary' onClick={() => changeToShowState()} className={classes.button}>
        {`הצג ${toShowTitle}`}
      </Button>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{width: '100%'}}
      >
        <Grid item xs={12} >
          {toShow === 'pie' && <BerralBatchStatisticsPieChart/>}
          {toShow === 'bar' && <BerralBatchChart/>} 
        </Grid> 
      </Grid>
      <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
    </Dialog>
  );
}