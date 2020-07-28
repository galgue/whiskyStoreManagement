import React from 'react';

import { useSelector } from 'react-redux';
import { stateProps } from '../interfaces';
import { WorkerDashboard } from './worker/WorkerDashboard';
import { ManagerDashboard } from './manager/ManagerDashboard';

export const Dashboard = () => {

    const isManager = useSelector((state:stateProps) => state.appState.loggedUser?.isManager || false);

    return ( 
        isManager ?
        <ManagerDashboard /> :
        <WorkerDashboard />
    );
};