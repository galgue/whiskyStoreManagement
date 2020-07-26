import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesChainController } from '../../../controllers/prossesChain.controller';
import { isValid } from '../../../entity/ProssesChain';
import { useSelector } from 'react-redux';
import { stateProps } from '../../../interfaces';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { ProssesChainDialog } from './../../Dialogs/ProssesChainDialog';



export const ChainOfProccessesTable = () =>{
    const isManager = useSelector((state: stateProps) => state.appState.loggedUser?.isManager || false);
    const [openChartsCard, setOpenChartsCard] = useState(false);


    let actions=[
        {
            icon: () => <Typography>דוחות</Typography>,
            isFreeAction: true,
            onClick: () => setOpenChartsCard(true),
        }
    ];

    const table = TableFactory.create('ניהול שרשראות תהליכים', ProssesChainController, tableColumns,
        isValid,
        {...(isManager? managerTableOptions: workerTableOptions), 
            actions
        })();
    
    return <>
        {table}
        {<ProssesChainDialog onOpen={setOpenChartsCard} open={openChartsCard} />}
    </>
}
    
