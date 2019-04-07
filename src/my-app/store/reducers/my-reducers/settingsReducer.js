// inspired by src/store/reducers/fuse/settings.reducer.js

// import * as Actions from '../../actions/fuse/index';

// begin my add
// import * as Actions from '../../actions/my-actions/index';
// import * as Actions from 'my-app/store/actions/my-actions/settingsActions';
import * as Actions from 'my-app/store/actions/my-actions/index';

import { defaultSettings } from 'my-app/config/AppConfig';
// end my add

import _ from 'lodash';
// import { 
//   FuseDefaultSettings,
//   // FuseLayouts,
// } from '@fuse';

const initialState = {
  // defaults: _.merge( {}, FuseDefaultSettings, ),
  // current: _.merge( {}, FuseDefaultSettings, ),
  settings: _.merge( {}, defaultSettings, ),
};

// function settingsReducer(state = initialState, action) {
const settingsReducer = ( state = initialState, action, ) => {
  // console.log('Hallo');
  switch (action.type) {
    // case Actions.SET_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       current: _.merge({}, state.current, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
    //     };
    //   }
    // case Actions.SET_DEFAULT_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       defaults: _.merge({}, state.defaults, action.value),
    //       current: _.merge({}, state.defaults, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
    //     };
    //   }
    // case Actions.RESET_DEFAULT_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       defaults: _.merge({}, state.defaults),
    //       current: _.merge({}, state.defaults)
    //     };
    //   }

    // begin my add
    case Actions.UPDATE_SETTINGS:
        console.log('stateSettingsReducer\n', state);
        console.log('action.value\n', action.value); //debugger;
        return {
          ...state,
          settings: _.merge({}, action.value),
        };
        break;
    // end my add

    default:
      return state;
  }
};

export default settingsReducer;