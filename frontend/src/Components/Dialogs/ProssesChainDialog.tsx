import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { ChainChart } from '../Dashboard/common/ChainChart';
import { Button, Grid } from '@material-ui/core';
import { ProssesChain } from '../../entity/ProssesChain';

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

export function ProssesChainDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onOpen, open } = props;

  const [toShow, setToShow] = useState<'bar' | 'pie'>('bar');


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">דוח שרשרת תהליכים</DialogTitle>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
      >
          <ChainChart size={{height: 300, width: 600}}/>
      </Grid>
      <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
    </Dialog>
  );
}