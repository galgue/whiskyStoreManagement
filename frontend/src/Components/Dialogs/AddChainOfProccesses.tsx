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
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { Row } from '../Tables/BatchesBarrelsTable';
import { chainOfProccessesRow } from '../Tables/ChainOfProccessesTable';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    button: {
        marginTop: '1em'
    },
    message: {
        textAlign: 'center',
        padding: '1em'
    },
    title: {
        paddingTop: '1em',
        textAlign: 'center'
    },
    formControl: {
        margin: '1em',
        minWidth: 120,
    },
});

export interface SimpleDialogProps {
    open: boolean;
    message: string;
    onOpen: (isOpen: boolean) => void
    onAdd: (Row: chainOfProccessesRow) => void
}

export const AddChainOfProccesses = (props: SimpleDialogProps) => {
    const classes = useStyles();
    const { open, message, onOpen } = props;

    return (
        <Dialog aria-labelledby='simple-dialog-title' open={open}>
            <DialogTitle className={classes.title} id='simple-dialog-title'>הוספת שרשרת תהליכים</DialogTitle>
            <TextField
                autoFocus
                margin='dense'
                id='name'
                label='שם שרשרת'
                size='medium'
                type='text'
            />
            <TextField
                autoFocus
                margin='dense'
                id='description'
                label='תיאור שרשרת'
                size='medium'
                type='text'
            />
            <FormControl className={classes.formControl}>
                <InputLabel id='proccess1-label'>Age</InputLabel>
                <Select
                    labelId='proccess1-label'
                    id='demo-simple-select'>

                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id='proccess2-label'>Age</InputLabel>
                <Select
                    labelId='proccess2-label'
                    id='demo-simple-select'
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id='proccess3-label'>Age</InputLabel>
                <Select
                    labelId='proccess3-label'
                    id='demo-simple-select'
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id='proccess4-label'>Age</InputLabel>
                <Select
                    labelId='proccess4-label'
                    id='demo-simple-select'
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>אישור</Button>
        </Dialog>
    );
}