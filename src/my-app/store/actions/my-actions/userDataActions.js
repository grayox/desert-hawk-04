// inspired by src/store/actions/fuse/settings.actions.js

// export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
// export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
// export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';
// begin my add
export const UPDATE_SETTINGS = '[SETTINGS] UPDATE SETTINGS';
export const UPDATE_DASHBOARD = '[DASHBOARD] UPDATE DASHBOARD';
// end my add

// export function setSettings(value) {
//   return {
//     type: SET_SETTINGS,
//     value
//   }
// }

// export function setDefaultSettings(value) {
//   return {
//     type: SET_DEFAULT_SETTINGS,
//     value
//   }
// }

// export function resetSettings(value) {
//   return {
//     type: RESET_DEFAULT_SETTINGS,
//     value
//   }
// }

// begin my add

// export function updateSettings(value) {
export const updateSettings = value => {
  // console.log('updateSettingsValue\n', value);
  return {
    type: UPDATE_SETTINGS,
    value,
  }
}

export const updateDashboard = value => {
  // console.log('updateDashboardValue\n', value);
  return {
    type: UPDATE_DASHBOARD,
    value,
  }
}

// end my add