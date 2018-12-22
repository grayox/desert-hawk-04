export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';

export function setSettings(value) {
  return {
    type: SET_SETTINGS,
    value
  }
}

export function setDefaultSettings(value) {
  return {
    type: SET_DEFAULT_SETTINGS,
    value
  }
}

export function resetSettings(value) {
  return {
    type: RESET_DEFAULT_SETTINGS,
    value
  }
}

// from marioplan...projectActions
export const editName = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log('Hello world from editName');
    debugger;
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
}