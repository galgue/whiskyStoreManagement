import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Row } from '../Tables/BatchesBarrelsTable';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  open: boolean;
  rowData:Row;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const {rowData, open } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">נתוני אצוות חבית</DialogTitle>
       {rowData ? rowData.id:''}
    </Dialog>
  );
}

interface SimpleDialogDemoPros{
rowData:Row;
open:boolean
}

export default function SimpleDialogDemo(props:SimpleDialogDemoPros) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
             <SimpleDialog rowData={props.rowData} open={props.open}/>
  );
}