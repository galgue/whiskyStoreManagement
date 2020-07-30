import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MaterialTable, { MTableCell, Column, Options } from 'material-table';
import { TableFactory } from '../Tables/TableFactory';
import { tableColumns } from '../Tables/Uses/columns';
import { workerTableOptions } from '../Tables/options/managerTableOptions';
import { isValid } from '../../entity/Uses';
import { Use } from '../../entity/Uses';
import { UseController } from '../../controllers/use.controller';

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
    data: Use[];
    onOpen: (isOpen: boolean) => void;
    onFinish: () => void;
}

export const BarrelBatchesUsageDialog = (props: SimpleDialogProps) => {
    const classes = useStyles();
    const { open, data, onOpen, onFinish } = props;   
    
    let table:() => JSX.Element = TableFactory.create('שימוש', UseController, tableColumns, isValid, 
    {...workerTableOptions, rowData: data, onFinish });

    const initTable = () => {
        table = TableFactory.create('שימוש', UseController, tableColumns, isValid, 
        {...workerTableOptions, rowData: data });
    }

    initTable();

    useEffect(() => {
        initTable();
    }, [data])
    
    
    return (<>
        <Dialog aria-labelledby="simple-dialog-title" open={open}
            fullWidth={true} maxWidth={'md'}>
            {table()}
            <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
        </Dialog>
        </>
    );
}