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

const emails = ['username@gmail.com', 'user02@gmail.com'];
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
    message: string;
    onOpen: (isOpen: boolean) => void
}

export const ErrorMessage = (props: SimpleDialogProps) => {
    const classes = useStyles();
    const { open, message, onOpen } = props;

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle className={classes.title} id="simple-dialog-title">הודעת שגיאה</DialogTitle>
            <Typography className={classes.message} variant='h6'>{message}</Typography>
            <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>אישור</Button>
        </Dialog>
    );
}

