import { combineReducers } from 'redux';
import settings from './settingsReducer';
import leads from './leadsReducer';
import contacts from './contactsReducer';

const reducers = combineReducers({
  settings,
  leads,
  contacts,
});

export default reducers;