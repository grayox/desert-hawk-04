// from marioplan...projectActions
export const updateSettings = settings => {
  return (dispatch, getState, {getFirestore}) => {
    // console.log('Hello world from editSetting');
    // console.log('newSettings\n', newSettings);
    // debugger;

    const state = getState();
    // console.log('state\n', state);
    const uid = state.auth.user.data.uid;
    
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .add({
        settings,
        createdAt: new Date(),
        timestamp: Date.now(),
    }).then(() => {
      dispatch({ type: 'UPDATE_SETTINGS_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SETTINGS_ERROR' }, err);
    });
  }
}