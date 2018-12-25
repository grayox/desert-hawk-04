// from marioplan...projectActions
export const editSetting = setting => {
  return (dispatch, getState, {getFirestore}) => {
    // console.log('Hello world from editSetting');
    // console.log('setting\n', setting);
    // debugger;
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    firestore.collection('settings').add({
      setting,
      createdAt: new Date(),
      timestamp: Date.now(),
    }).then(() => {
      dispatch({ type: 'EDIT_SETTING_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'EDIT_SETTING_ERROR' }, err);
    });
  }
}