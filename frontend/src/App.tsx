import React from 'react';
import RightToLeft from './Components/RightToLeft';
import { SignIn } from './Components/Login';
import { Routes } from './Components/Routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return   <BrowserRouter>
  <RightToLeft>
  <Routes/>
</RightToLeft>
</BrowserRouter>
}

export default App;
