import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';
import { SignIn } from './Login';
import { BatchesBarrelPage } from '../Pages/BatchesBarrel';
import { useSelector, useDispatch } from 'react-redux';
import { stateProps } from './interfaces';
import { BarrelTypeManagementPage } from '../Pages/BarrelTypeManagement';
import { BatchesBarrelTaskManagement } from '../Pages/BatchesBarrelTaskManagement';
import { ChainsOfproccessManagementPage } from '../Pages/ChainsOfProccessManagement';
import { UserManagementPage } from '../Pages/UserManagement';
import { ProccessManagementPage } from '../Pages/ProccessManagement';
import { MissonManagementPage } from '../Pages/MissonManagement';
import { CommentsPage } from '../Pages/Comments';
import { BarrelUsagePage } from '../Pages/BarrelUsage';
import { UserController } from '../controllers/users.controller';
import { setLoggedUser } from '../Actions/actionsCreator';
import { Dashboard } from './Dashboard/dashboard';

export const LOGIN_ROUTE = '/Login';
export const DASHBOARD_ROUTE = '/dashboard';
export const BATCHES_BARRELS_ROUTE = '/BarrelsBatches';
export const BATCHES_BARRELS_TYPE_ROUTE = '/BarrelsBatchesType';
export const BATCHES_BARRELS_TASK_MANAGEMENT_ROUTE = '/BarrelsBatchesTaskManagement';
export const CHAIN_OF_PROCCESS_MANAGEMENT_ROUTE = '/ChainsOfProccessManagement';
export const USER_MANAGEMENT_ROUTE = '/UserManagement';
export const PROCCESS_MANAGEMENT_ROUTE = '/proccessManagement';
export const MISSON_MANAGEMENT_ROUTE = '/missonManagement';
export const COMMENTS_ROUTE = '/comments';
export const BARREL_USAGE_ROUTE = '/barrelUsage'
export const Routes = () => {
    const loggedUser = useSelector((state: stateProps) => state.appState.loggedUser);
    const dispatch = useDispatch();
    let history = useHistory();

    const redirection = (Component: JSX.Element, route: string) => {
        if (route === LOGIN_ROUTE) {
            return !!loggedUser ? Component : <Redirect to={BATCHES_BARRELS_ROUTE} />
        }
        return !!loggedUser ? Component : <Redirect to={LOGIN_ROUTE} />
    }

    return <>
        <Route path={'/trytologin'} render={() => {
            UserController.isLogged().then(response => {
                    const userData = response.data;
                    if(userData) {
                        dispatch(setLoggedUser(userData));
                        history.replace(DASHBOARD_ROUTE);
                    } else {
                        history.replace(LOGIN_ROUTE);
                    }
                }).catch(() => {
                    history.replace(LOGIN_ROUTE);
                })
                return <></>
            } 
        }
        />
        <Route path={LOGIN_ROUTE} render={() =>
            <SignIn />} />
        <Route path={DASHBOARD_ROUTE} render={() =>
            redirection(<Dashboard />, DASHBOARD_ROUTE)} />
        <Route path={BATCHES_BARRELS_ROUTE} render={() =>
            redirection(<BatchesBarrelPage />, BATCHES_BARRELS_ROUTE)} />
        <Route path={BATCHES_BARRELS_TYPE_ROUTE} render={() =>
            redirection(<BarrelTypeManagementPage />, BATCHES_BARRELS_TYPE_ROUTE)} />
        <Route path={BATCHES_BARRELS_TASK_MANAGEMENT_ROUTE} render={() =>
            redirection(<BatchesBarrelTaskManagement />, BATCHES_BARRELS_TASK_MANAGEMENT_ROUTE)} />
        <Route path={CHAIN_OF_PROCCESS_MANAGEMENT_ROUTE} render={() =>
            redirection(<ChainsOfproccessManagementPage />, CHAIN_OF_PROCCESS_MANAGEMENT_ROUTE)} />
        <Route path={PROCCESS_MANAGEMENT_ROUTE} render={() =>
            redirection(<ProccessManagementPage />, PROCCESS_MANAGEMENT_ROUTE)} />
        <Route path={USER_MANAGEMENT_ROUTE} render={() =>
            redirection(<UserManagementPage />, USER_MANAGEMENT_ROUTE)} />
        <Route path={MISSON_MANAGEMENT_ROUTE} render={() =>
            redirection(<MissonManagementPage />, MISSON_MANAGEMENT_ROUTE)} />
        <Route path={COMMENTS_ROUTE} render={() =>
            redirection(<CommentsPage />, COMMENTS_ROUTE)} />
        <Route path={BARREL_USAGE_ROUTE} render={() =>
            redirection(<BarrelUsagePage/>, BARREL_USAGE_ROUTE)} />
        <Redirect from='/' exact to={'/trytologin'} />

    </>
}




