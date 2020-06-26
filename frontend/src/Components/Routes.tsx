import React from 'react'
import { Route } from 'react-router-dom';
import { SignIn } from './Login';
import { BatchesBarrelPage } from '../Pages/BatchesBarrel';

export const LOGIN_ROUTE = '/Login';
export const MAIN_ROUTE = '/Main';

export const Routes = () => {
//     const redirection = (Component: JSX.Element, route: string) => {
//         if (route === LOGIN_ROUTE) {
//             return !appState.loggedUser ? Component : <Redirect to={USERS_MANAGEMENT_ROUTE} />
//         }
//         return appState.loggedUser ? Component : <Redirect to={LOGIN_ROUTE} />
//     }

    // return <>
    //     <Redirect from='/' exact to={LOGIN_ROUTE} />
    //     <Route path={LOGIN_ROUTE} render={() =>
    //         redirection(<Login />, LOGIN_ROUTE)} />
    //     <Route path={USERS_MANAGEMENT_ROUTE} render={() =>
    //         redirection(<UsersManagement />, USERS_MANAGEMENT_ROUTE)} />
    //     <Route path={BOOKS_MANAGEMENT_ROUTE} render={() =>
    //         redirection(<BooksManagement />, BOOKS_MANAGEMENT_ROUTE)} />
    //     <Route path={AUTHORS_MANAGEMENT_ROUTE} render={() =>
    //         redirection(<AuthorsManagement />, AUTHORS_MANAGEMENT_ROUTE)} />
    // </>

    return <>
    <Route exact path={LOGIN_ROUTE} render={() => <SignIn/>} />
    <Route exact path = {MAIN_ROUTE} render={() => <BatchesBarrelPage/>} />
    </>
}




