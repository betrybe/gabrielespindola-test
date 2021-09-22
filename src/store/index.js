/**
[instrução do teste]
Configurando o Redux DevTools
Pra usarmos o Redux DevTools com o Redux-Thunk, você pode usar uma biblioteca chamada composeWithDevTools. Ela já está no package.json, a única coisa que você vai precisar fazer é configurar a sua store, por exemplo:

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
 */

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';

export default createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)));
