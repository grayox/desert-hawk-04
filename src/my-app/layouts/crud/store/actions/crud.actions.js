// inspired by: src/my-app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

const handleEditDashboard = ( uid, path, oldData, increment, ) =>
    // uid: string: 'abcxyz'
    // path: string: 'leads'
    // oldData: object: {net: 5, outbox: 4, ...}
    // increment: integer: 1 | -1
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    console.log('uid\n', uid,); // 'abcxyz'
    console.log('path\n', path,); // 'leads'
    console.log('oldData\n', oldData,); // {net: 5, outbox: 4, ...}
    console.log('increment\n', increment,); // 1
    const mapEntityPathNameToDashboard = {
      leads: 'outbox',
    };
    const dashItem = mapEntityPathNameToDashboard[path]; // 'outbox'
    const oldCount = oldData[dashItem]; // 4
    const newCount = oldCount + increment; // 5
    const newData = {
      ...oldData,
      [dashItem]: newCount,
    };
 
    console.log('newData\n', newData,); // {net: 5, outbox: 5, ...}
    
    const firestore = getFirestore();
    firestore
      .collection('users')
      .doc(uid)
      .collection('dashboard')
      .add(newData).then(() => {
      dispatch({ type: 'EDIT_DASHBOARD_SUCCESS', });
    }).catch( error => {
      dispatch({ type: 'EDIT_DASHBOARD_ERROR', }, error);
    });
  }

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createItem = ( path, item, uid, dashboard, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {

    // console.log('path\n', path,)
    // console.log('item\n', item,)
    // console.log('uid\n', uid,)
    // console.log('dashboard\n', dashboard,)

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
      dispatch({ type: 'CREATE_ITEM_SUCCESS', });
      console.log('uid\n', uid,); // 'abcxyz'
      console.log('path\n', path,); // 'leads'
      console.log('dashboard\n', dashboard,); // {net: 5, outbox: 4, ...}
      handleEditDashboard( uid, path, dashboard, 1, );
    }).catch( error => {
      dispatch({ type: 'CREATE_ITEM_ERROR', }, error);
    });
  }

export const updateItem = ( path, docId, newItem, oldItem, ) => // uid,
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newData = {
      ...newItem,
      updatedAt: timestamp,
      updates: {
        replacedAt: timestamp,
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
      dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
    }).catch( error => {
      dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
    });
  }

// To "delete" a record, we do NOT use the .delete() method described here: https://firebase.google.com/docs/firestore/manage-data/delete-data
// Instead, we will update the record with a field: deletedAt: Date.now()
// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
// Then, we will query records without a deletedAt field as described here: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
// example: citiesRef.where("state", "==", "CO").where("deletedAt", "==", false)
export const deleteItem = ( path, docId, uid, dashboard, ) =>
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
      dispatch({ type: 'DELETE_ITEM_SUCCESS', });
      handleEditDashboard( uid, path, dashboard, -1, );
    }).catch( error => {
      dispatch({ type: 'DELETE_ITEM_ERROR', }, error);
    });
  }