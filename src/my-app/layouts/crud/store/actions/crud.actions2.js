// inspired by: src/my-app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

const handleEditDashboard = ( uid, path, oldData, incrementer, sourceDocId, dispatch, getFirestore, ) => {
    // uid: string: 'abcxyz'
    // path: string: 'leads'
    // oldData: object: { net: 5, outbox: 4, ... }
    // incrementer: integer: 1 | -1
    // console.log('uid\n', uid,); // 'abcxyz'
    // console.log('path\n', path,); // 'leads'
    // console.log('incrementer\n', incrementer,); // 1
    const timestamp = Date.now();
    const mapEntityPathNameToDashboard = {
      leads: 'outbox',
    };
    const dashItem = mapEntityPathNameToDashboard[path]; // 'outbox'
    const oldCount = oldData[dashItem]; // 4
    const newCount = oldCount + incrementer; // 5
    const newData = {
      ...oldData,
      [dashItem]: newCount, // outbox: 5
      createdAt: timestamp,
      deletedAt: 0,
      sourceDocId,
    };
    // console.log('newData\n', newData,); // {net: 5, outbox: 5, ...}
    
    const firestore = getFirestore();
    firestore
      .collection('users')
      .doc(uid)
      .collection('dashboard')
      .add(newData)
      // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#increment_a_numeric_value
      // .update({
      //   [dashItem] : firestore.FieldValue.increment(incrementer),
      // })
    .then( docRef => {
      // console.log('docRef\n', docRef,);
      dispatch({ type: 'EDIT_DASHBOARD_SUCCESS', });
    })
    .catch( error => {
      console.log('error\n', error,);
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

    // const timestamp = Date.now();
    const newData = {
      ...item,
      // createdAt: timestamp,
      deletedAt: 0,
      // createdAt: new Date(),
      // authorFirstName: 'Net',
      // authorLastName: 'Ninja',
      // authorId: 12345,
    };

    if(!item.createdAt) {
      const timestamp = Date.now();
      item.createdAt = timestamp;
    }

    // make async call to database
    const firestore = getFirestore();
    // console.log('item\n', item);
    // console.log('firestore\n', firestore);
    // console.log('getState\n', getState);

    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    // firestore.collection('test').add({
    firestore
      .collection(path)
      .add(newData)
    .then( docRef => {
      handleEditDashboard( uid, path, dashboard, 1, docRef.id, dispatch, getFirestore, );
      // console.log('uid\n', uid,); // 'abcxyz'
      // console.log('path\n', path,); // 'leads'
      // console.log('docRef\n', docRef,);
      dispatch({ type: 'CREATE_ITEM_SUCCESS', });
    })
    .catch( error => {
      console.log('error\n', error,);
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
    const newDoc = {
      ...newItem,
      createdAt: oldItem.createdAt,
      updatedAt: timestamp,
      updatedItem: docId,
      deletedAt: 0, // bypass readable filter 
    };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .add(newDoc) // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    .then( docRef => {
      const newDocId = docRef.id;
      // console.log( 'Document written with ID: ', newDocId, );
      const newData = {
        deletedAt: timestamp, // use deletedAt instead of replacedAt because that's the filter used by LoadAsync.js
        replacedBy: newDocId,
      };
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
          console.log('error\n', error,);
          dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
        });
    })
    .then(() => {
      dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
    })
    .catch( error => {
      console.log('error\n', error,);
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
    .then( () => {
      handleEditDashboard( uid, path, dashboard, -1, docId, dispatch, getFirestore, );
      dispatch({ type: 'DELETE_ITEM_SUCCESS', });
    }).catch( error => {
      console.log('error\n', error,);
      dispatch({ type: 'DELETE_ITEM_ERROR', }, error);
    });
  }