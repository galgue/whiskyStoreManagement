import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

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
    message: string
}

export const ErrorMessage = ({ message }: SimpleDialogProps) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [shownMessage, setshownMessage] = useState('');

    useEffect(() => {
        if(message !== ''){
            setshownMessage(message);
            setIsOpen(true);
        }
    }, [message])

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={isOpen}>
            <DialogTitle className={classes.title} id="simple-dialog-title">הודעת שגיאה</DialogTitle>
            <Typography className={classes.message} variant='h6'>{shownMessage}</Typography>
            <Button color='primary' onClick={() => setIsOpen(false)} className={classes.button}>אישור</Button>
        </Dialog>
    );
}

