// from marioplan...projectActions
export const editName = name => {
  return (dispatch, getState, {getFirestore}) => {
    // console.log('Hello world from editName');
    // console.log('name\n', name);
    // debugger;
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      name,
      createdAt: new Date(),
      timestamp: Date.now(),
    }).then(() => {
      dispatch({ type: 'EDIT_NAME_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'EDIT_NAME_ERROR' }, err);
    });
  }
}