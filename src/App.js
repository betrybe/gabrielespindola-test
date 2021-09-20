import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/carteira" exact>
        <Wallet />
      </Route>
    </Switch>);
}

export default App;
