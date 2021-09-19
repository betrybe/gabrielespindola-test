import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RequireAuth from './auth/RequireAuth';
import VerifyAuth from './auth/VerifyAuth';
import Wallet from './pages/Wallet';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <VerifyAuth>
          <Login />
        </VerifyAuth>
      </Route>
      <Route path="/carteira" exact>
        <RequireAuth>
          <Wallet />
        </RequireAuth>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>);
}

export default App;
