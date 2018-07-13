
import { combineReducers } from 'redux';

const TEMP_CONST = 'TEMP_CONST';
const TEMP_CONST_2 = 'TEMP_CONST_2';
//TODO: Actions & Action Creators 

const dummyReducer = (state = [], action) => {
  switch(action.type) {
    case TEMP_CONST: 
      return [...state, action.data];
    default: 
      return state;
  }
};

const otherDumbReducer = (state=[], action) => {
  switch(action.type) {
    case TEMP_CONST_2: 
      return [...state, action.data]; 
    default: 
      return state; 
  }
}

const rootReducer = combineReducers({
  dummyReducer, 
  otherDumbReducer
});







export default rootReducer;