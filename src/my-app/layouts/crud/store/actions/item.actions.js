// inspired by: src/my-app/store/actions/my-actions/leadsActions.js

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createItem = item => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    console.log('item\n', item);
    console.log('firestore\n', firestore);
    console.log('getState\n', getState);
    firestore.collection('test').add({
      ...item,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      timestamp: Date.now(),
      // createdAt: new Date(),
    }).then( () => {
      dispatch({ type: 'CREATE_ITEM_SUCCESS' });
    }).catch( error => {
      dispatch({ type: 'CREATE_ITEM_ERROR' }, error);
    });
  }
};