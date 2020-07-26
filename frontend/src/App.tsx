import React, { useEffect } from 'react';
import RightToLeft from './Components/RightToLeft';
import { SignIn } from './Components/Login';
import { Routes } from './Components/Routes';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAppState } from './Actions/actionsCreator';
import { WebsiteBar } from './Components/AppBar';
import { Box } from '@material-ui/core';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(setAppState());
  }
  , []);
  return   <BrowserRouter>
  <RightToLeft>
  <WebsiteBar/>
  <Box marginTop={'1em'}>
  <Routes/>
  </Box>
</RightToLeft>
</BrowserRouter>
}
