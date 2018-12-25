// from marioplan...projectActions
export const updateSettings = newSettings => {
  return (dispatch, getState, {getFirestore}) => {
    // console.log('Hello world from editSetting');
    // console.log('newSettings\n', newSettings);
    // debugger;
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    firestore.collection('settings').add({
      newSettings,
      createdAt: new Date(),
      timestamp: Date.now(),
    }).then(() => {
      dispatch({ type: 'UPDATE_SETTINGS_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SETTINGS_ERROR' }, err);
    });
  }
}