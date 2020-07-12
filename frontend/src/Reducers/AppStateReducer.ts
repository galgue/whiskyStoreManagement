import { SET_LOGGED_USER, SET_APP_STATE } from "../Actions/actions";


export interface appState {
    loggedUser:number;
}
    

const initialState: appState = {
    loggedUser: 0
};

type action = {
    type: string,
    userId?: string,
}

export const appStateReducer = (state = initialState, action: action) => {
    switch (action.type) {

        case SET_APP_STATE:
        console.log("dfdfdsf");
        return initialState

        case SET_LOGGED_USER:
            console.log("im here")
            return { ...state, loggedUser: action.userId };

        default:
            return state;
    }
}
