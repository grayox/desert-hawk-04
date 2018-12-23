import { combineReducers } from 'redux';
import contacts from './contactsReducer';
import leads from './leadsReducer';
import settings from './settingsReducer';
import settingsTabs from './settingsTabsReducer';

const reducers = combineReducers({
  contacts,
  leads,
  settings,
  settingsTabs,
});

export default reducers;