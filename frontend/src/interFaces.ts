
export interface appState {
    loggedUser:{userName: String, isManager: Boolean} | undefined;
}

export interface stateProps {
   appState:appState;
}