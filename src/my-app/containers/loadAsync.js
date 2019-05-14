// import React, { Component } from 'react';
// import React from 'react';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

const DEFAULT_LIMIT = 20;

// ref: https://medium.freecodecamp.org/how-to-master-async-await-with-this-real-world-example-19107e7558ad

// export const loadAsyncData = () => {
//   let timeout;
//   const promise = new Promise((resolve, reject) => {
//     timeout = setTimeout(
//       () =>
//         resolve({
//           example: "value",
//           random: Math.random()
//         }),
//       1000
//     );
//   });
//   promise.cancel = () => clearTimeout(timeout);
//   return promise;
// };

export const loadUserData = async path => {
  // path: string: example: 'users/myUserID/settings' | 'users/myUserID/dashboard'
  // console.log('path\n', path);
  const out = await getUserData(path);
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getUserData = async path => {
  // console.log('path\n', path);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  // debugger;
  const a = [];
  const db = firebase.firestore();
  const ready = db;
  if(!ready) return;

  const out = await db.collection(path)
    // .where( 'deletedAt', '==', 0, ) // filters out deleted documents
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ) // throws error: "firebase error: the query requires an index"
    .limit(1)
    .get()
    .then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data());
        // console.log('createdAt: ', doc.createdAt()); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt')); // undefined
        // console.log('id: ', doc.id); // works
        // console.log('data\n', doc.data()); // works
        a.push({
          ...doc.data(), // !important, this line is FIRST, otherwise docId will be overwritten
          docId: doc.id, // !important, this line is LAST
        });
        // console.log('a\n', a);
        // this.setState(a);
      });
      // console.log('a\n', a);
      return a;
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result);
      // debugger;
      // return result;
      return result[0];
    })
    // .then(() => {
    //   this.unsubscribe(path);
    //   return path;
    // })
    .catch(error => {
      console.error('Error getting documents: \n', error);
      throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
    });
  // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
  // always set state inside promise!
  // otherwise, function returns before data loads!
  return out;
  // const newState = { items: out };
  // this.setState(newState);
  // }
};

export const loadAsyncData = async ( path, limiter, startAfter, ) => {
  // console.log('path\n', path);
  const limit = limiter || DEFAULT_LIMIT;
  const out = await getAsyncItems( path, limit, startAfter, );
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getAsyncItems = async ( path, limiter, startAfter, ) => {
  // used for reading CRUD objects
  // console.log('path\n', path);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});

  const limit = limiter || DEFAULT_LIMIT;
  
  // debugger;
  const data = [];
  const db = firebase.firestore();
  const ready = db;
  if(!ready) return;

  let lastVisible;

  const queryInit = await db.collection(path)
    .where( 'deletedAt', '==', 0, ) // filters out deleted documents // deletedAt also used by updateItem (not replacedAt)
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ); // throws error: "firebase error: the query requires an index"

  // paginate query
  // ref: docs: https://firebase.google.com/docs/firestore/query-data/query-cursors
  // ref: youtube: https://www.youtube.com/watch?v=poqTHxtDXwU
  // use trinary operator to makes query robust to cases where there is no startAfter value
  const queryPage = startAfter ? queryInit.startAfter(startAfter) : queryInit;

  const out = queryPage    
    // .limit(10)
    .limit(limit)
    .get()
    .then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data(),);
        // console.log('createdAt: ', doc.createdAt(),); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt'),); // undefined
        // console.log('id: ', doc.id,); // works
        // console.log('data\n', doc.data(),); // works
        // console.log('doc\n', doc,);
        data.push({
          docId: doc.id,
          ...doc.data(),
        });
        // console.log('a\n', a);
        // this.setState(a);
        lastVisible = doc;
      });
      // console.log('a\n', a); // {data: arrayOfObjects, lastVisible: docSnapshot,}  (same as below two returns)
      return { data, lastVisible, };
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result); // {data: arrayOfObjects, lastVisible: docSnapshot,} (same as returns above and below)
      // debugger;
      return result;
    })
    // .then(() => {
    //   this.unsubscribe(path);
    //   return path;
    // })
    .catch(error => {
      console.error('Error getting documents: \n', error);
      throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
    });
    // if not contained within a promise,
    // then this step returns before promise settles;
    // therefore, it returns an empty array
    // therefore, always set state inside promise!
    // otherwise, function returns before data loads!
    // console.log('out\n', out); // {data: arrayOfObjects, lastVisible: docSnapshot,} (same as above two returns)
    return out;
    // const newState = { items: out };
    // this.setState(newState);
    // }
};