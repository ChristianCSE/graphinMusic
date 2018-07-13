
//dummy routing 

import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createBroswerHistory } from 'history';
import { routerReducer } from './reducer';
import { routerMiddleware } from './listener';
import { push } from './actions';

