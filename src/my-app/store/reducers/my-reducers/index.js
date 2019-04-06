import { combineReducers } from 'redux';
import contacts from './contactsReducer';
import leads from './leadsReducer';
// import settingsTabsReducer from './settingsTabsReducer';
import settingsReducer from './settingsReducer';

const reducers = combineReducers({
  contacts,
  leads,
  // settingsTabsReducer,
  settingsReducer,
});

export default reducers;