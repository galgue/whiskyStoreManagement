import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { BerralBatchController } from '../../../controllers/berralBatch.controller';
import { isValid, BerralBatch } from '../../../entity/BerralBatch';
import { stateProps } from '../../interfaces';
import { useSelector } from 'react-redux';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';
import { useState } from 'react';
import React from 'react';
import { MissonDialog } from '../../Dialogs/MissonDialog';
import { CommentsDialog } from '../../Dialogs/CommentsDialog';
import { BarrelBatchesUsageDialog } from '../../Dialogs/BarreBatchesUsage';
import { Typography } from '@material-ui/core';
import { BarrelBatchesChartDialog } from '../../Dialogs/BarrelBatchesChartDialog';
 

export const BatchesTable = () =>{
    const [selectedRow, setSelectedRow] = useState<BerralBatch>();
    const [openMissonCard, setOpenMissonCard] = useState(false);
    const [openCommentsCard, setOpenCommentsCard] = useState(false);
    const [openBarrelBatchesUsageCard, setOpenBarrelBatchesUsageCard] = useState(false);
    const [openBarrelBatchesChartCard, setOpenBarrelBatchesChartCard] = useState(false);

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);
    
    let actions=[
                {
                    icon: () => <Typography>משימות אצוות חבית</Typography>,
                    isFreeAction: true,
                    onClick: () => setOpenMissonCard(true),
                    disabled: selectedRow === undefined
                },
                {
                    icon: () => <Typography>הערות אצוות חבית</Typography>,
                    isFreeAction: true,
                    onClick: () => setOpenCommentsCard(true),
                    disabled: selectedRow === undefined
                },
                {
                    icon: () => <Typography>שימושי אצוות חבית</Typography>,
                    isFreeAction: true,
                    onClick: () => setOpenBarrelBatchesUsageCard(true),
                    disabled: selectedRow === undefined
                },
                {
                    icon: () => <Typography>דוחות</Typography>,
                    isFreeAction: true,
                    onClick: () => setOpenBarrelBatchesChartCard(true),
                }
            ];
    const table = TableFactory.create('אצוות חביות', BerralBatchController, tableColumns,
        isValid,
        {...(isManager? managerTableOptions: workerTableOptions), 
            onSelectRow: setSelectedRow, selectedRow,
            actions
        })();

    return (
    <>
        {table}
        {selectedRow?.missions && <MissonDialog onOpen = {setOpenMissonCard} open={openMissonCard} data={selectedRow.missions} />}
        {selectedRow?.notes && <CommentsDialog onOpen = {setOpenCommentsCard} open={openCommentsCard} data={selectedRow.notes} />}
        {selectedRow?.uses && <BarrelBatchesUsageDialog onOpen = {setOpenBarrelBatchesUsageCard} open={openBarrelBatchesUsageCard} data={selectedRow.uses} />}
        {<BarrelBatchesChartDialog onOpen = {setOpenBarrelBatchesChartCard} open={openBarrelBatchesChartCard} />}
    </>
    );
}