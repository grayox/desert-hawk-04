// inspired by: src/my-app/components/forms/store/reducers/index.js

import {combineReducers} from 'redux';
import crud from './crud.reducer';
import crud from './item.reducer';

const reducer = combineReducers({
  crud,
});

export default reducer;