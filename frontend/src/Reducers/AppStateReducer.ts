import { SET_LOGGED_USER, SET_APP_STATE } from "../Actions/actions";


export interface appState {
    loggedUser:{userName: String, isManager: Boolean} | undefined;
}
    

const initialState: appState = {
    loggedUser: undefined
};

type action = {
    type: string,
    userInfo?: {userName: String, isManager: Boolean},
}

export const appStateReducer = (state = initialState, action: action) => {
    switch (action.type) {

        case SET_APP_STATE:
            return initialState

        case SET_LOGGED_USER:
            return { ...state, loggedUser: action.userInfo };

        default:
            return state;
    }
}
