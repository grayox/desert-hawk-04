// from marioplan...projectActions
export const updateSettings = settings => {
  // prevent saving settings.id of previous settings object
  if(settings && settings.id) delete settings.id;
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
    
    const targetCollection = firestore
                               .collection('users')
                               .doc(uid)
                               .collection('settings');
    const targetDoc = targetCollection.doc('current');
    const targetContent = {
      ...settings,
      timestamp: Date.now(),
      // createdAt: new Date(),
    };

    // targetCollection.add(targetContent) // archive with unique id
    // targetDoc.update(targetContent)
    targetDoc.set(targetContent)
    // targetDoc
    //   .update(targetContent) // update current
    //   .then(() => {
    //     targetCollection.add(targetContent); // archive with unique id
    //   })
    // firestore
    //   .collection('users')
    //   .doc(uid)
    //   .collection('settings')
    //   .add({
    //     ...settings,
    //     timestamp: Date.now(),
    //     // createdAt: new Date(),
    /// }).then(() => {
      .then(() => {
      dispatch({ type: 'UPDATE_SETTINGS_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SETTINGS_ERROR' }, err);
    });
  }
}