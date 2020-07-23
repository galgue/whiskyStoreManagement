import { SET_LOGGED_USER, SET_APP_STATE } from "./actions";

export const setAppState = () => ({type:SET_APP_STATE});

export const setLoggedUser = (userInfo:{userName: String, isManager: Boolean}) => ({type: SET_LOGGED_USER,userInfo: userInfo});
export const loggoutUser = () => ({type: SET_LOGGED_USER,userInfo: undefined});