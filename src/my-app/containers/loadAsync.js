// import React, { Component } from 'react';
import React from 'react';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

// ref: https://medium.freecodecamp.org/how-to-master-async-await-with-this-real-world-example-19107e7558ad

// export const loadMyAsyncData = () => {
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

export const loadMyAsyncData = async path => {
  // console.log('path\n', path);
  const out = await getItems(path);
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getItems = async path => {
  // console.log('path\n', path);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  // debugger;
  const a = [];
  const db = firebase.firestore();
  if(!db) return;
  const out = await db.collection(path)
    // .orderBy('added_at', 'desc')
    // .orderBy('created_at', 'desc')
    .orderBy('timestamp', 'desc')
    // .limit(1)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data());
        // console.log('timestamp: ', doc.timestamp()); // throws error // must define timestamp, then save it
        // console.log('timestamp: ', doc.get('created_at')); // undefined
        // console.log('id: ', doc.id); // works
        // console.log('data\n', doc.data()); // works
        a.push(doc.data());
        // console.log('a\n', a);
        // this.setState(a);
      });
      return a;
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result);
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
  // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
  // always set state inside promise!
  // otherwise, function returns before data loads!
  return out;
  // const newState = { items: out };
  // this.setState(newState);
  // }
};