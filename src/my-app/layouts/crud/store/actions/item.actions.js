// inspired by: src/my-app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createItem = ( path, item, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {

    const timestamp = Date.now();
    const newData = {
      ...item,
      createdAt: timestamp,
      deletedAt: 0,
      // createdAt: new Date(),
      // authorFirstName: 'Net',
      // authorLastName: 'Ninja',
      // authorId: 12345,
    };

    // make async call to database
    const firestore = getFirestore();
    // console.log('item\n', item);
    // console.log('firestore\n', firestore);
    // console.log('getState\n', getState);

    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    // firestore.collection('test').add({
    firestore.collection(path).add(newData).then(() => {
      dispatch({ type: 'CREATE_ITEM_SUCCESS' });
    }).catch( error => {
      dispatch({ type: 'CREATE_ITEM_ERROR' }, error);
    });
  }

export const updateItem = ( path, docId, newItem , oldItem, ) =>
(dispatch, getState, { getFirebase, getFirestore, }) => {
  // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  // console.log('path\n', path);
  // console.log('docId\n', docId);
  // console.log('getState\n', getState);

  const timestamp = Date.now();
  const newData = {
    ...newItem,
    updatedAt: timestamp,
    update: {
      updatedAt: timestamp,
      item: oldItem,
    },
  };

  // make async call to database
  const firestore = getFirestore();
  firestore
    .collection(path)
    .doc(docId)
    // .set(newData // do NOT use .set() method because it overwrites the data
    .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    // ,{ merge: true, }
    )
  .then(() => {
    dispatch({ type: 'UPDATE_ITEM_SUCCESS' });
  }).catch( error => {
    dispatch({ type: 'UPDATE_ITEM_ERROR' }, error);
  });
}

// To "delete" a record, we do NOT use the .delete() method described here: https://firebase.google.com/docs/firestore/manage-data/delete-data
// Instead, we will update the record with a field: deletedAt: Date.now()
// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
// Then, we will query records without a deletedAt field as described here: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
// example: citiesRef.where("state", "==", "CO").where("deletedAt", "==", false)
export const deleteItem = ( path, docId, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newData = { deletedAt: timestamp, };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .doc(docId)
      // .set(newData // do NOT use .set() method because it overwrites the data
      .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      // ,{ merge: true, }
      )
    .then(() => {
      dispatch({ type: 'DELETE_ITEM_SUCCESS' });
    }).catch( error => {
      dispatch({ type: 'DELETE_ITEM_ERROR' }, error);
    });
  }