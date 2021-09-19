import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// [instrução do teste] Configure os seus reducers.
// [instrução do teste] ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// documentação do combineReducers https://redux.js.org/api/combinereducers
export default combineReducers({ user, wallet });