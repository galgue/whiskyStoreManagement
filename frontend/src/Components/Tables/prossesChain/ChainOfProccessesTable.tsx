import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesChainController } from '../../../controllers/prossesChain.controller';
import { isValid } from '../../../entity/ProssesChain';
import { useSelector } from 'react-redux';
import { stateProps } from '../../../interfaces';
import { managerTableOptions, workerTableOptions } from '../options/managerTableOptions';



export const ChainOfProccessesTable = () =>{
    const isManager = useSelector((state: stateProps) => state.appState.loggedUser?.isManager || false);
    return TableFactory.create('ניהול שרשראות תהליכים', ProssesChainController, tableColumns,
     isValid,
     isManager ? managerTableOptions : workerTableOptions )();
}
    
