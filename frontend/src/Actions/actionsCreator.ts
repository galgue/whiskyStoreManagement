import { SET_LOGGED_USER, SET_APP_STATE } from "./actions";

export const setAppState = () => ({type:SET_APP_STATE});

export const setLoggedUser = (userId:number) => ({type: SET_LOGGED_USER,userId:userId});