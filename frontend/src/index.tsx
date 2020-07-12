import {App} from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { combineReducers, createStore } from 'redux';
import { appStateReducer } from './Reducers/AppStateReducer';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    appState: appStateReducer
  });
  
  const store = createStore(rootReducer);

  store.subscribe(()=>{
      console.log("yossibenayoon");
      console.log(store.getState());
    });
  
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  