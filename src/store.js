import * as reduxModule from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createReducer from 'store/reducers';
import thunk from 'redux-thunk';

// begin insert from marioplan
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import firebaseConfig from './config/firebaseConfig'
import firebaseConfig from './my-app/config/firebaseConfig'
// import rootReducer from './store/reducers/rootReducer'
// import rootReducer from './my-app/store/reducers/marioplan/rootReducer'
// end insert from marioplan

// begin insert from react-redux-firebase
import firebase from 'firebase'
// http://react-redux-firebase.com/docs/v2-migration-guide.html
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true
}
// initialize firebase instance
// corrects error
// error message:
// Error: The Firebase auth state could not be found in the store under the attribute 'firebase.auth'. Make sure your react-redux-firebase reducer is correctly set in the store
// the above error might also require correction by ensuring src/store/reducers/index.js has been correctly copied and updated
firebase.initializeApp(firebaseConfig) // <- new to v2.*.*
// firebase.firestore() // <- needed if using firestore
const firestore = firebase.firestore();
const settings = {
  // your settings...
  timestampsInSnapshots: true
};
firestore.settings(settings);
// end insert from react-redux-firebase

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
*/
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  // applyMiddleware(thunk)
  // begin insert from marioplan
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  // reactReduxFirebase(firebaseConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
  // reduxFirestore(firebaseConfig) // redux bindings for firestore
  // end insert from marioplan

  // begin insert from react-redux-firebase
  // http://react-redux-firebase.com/docs/v2-migration-guide.html
  reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
  reduxFirestore(firebase) // <- needed if using firestore
  // applyMiddleware(...middleware) // to add other middleware
  // end insert from react-redux-firebase
);

const store = createStore(createReducer(), enhancer);
// begin insert from marioplan
// const store = createStore(rootReducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reactReduxFirebase(firebaseConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
//     reduxFirestore(firebaseConfig) // redux bindings for firestore
//   )
// );
// end insert from marioplan
// per marioplan:
// const store = createStore(rootReducer,
//   compose(

store.asyncReducers = {};

// begin my add
// 1. These links describe how to access the global state object
//    https://egghead.io/lessons/react-redux-store-methods-getstate-dispatch-and-subscribe
//    https://stackoverflow.com/questions/38332912/how-do-i-access-store-state-in-react-redux
//    This code implements the above links
store.subscribe(() => {
  console.log('state\n', store.getState());
  // debugger;
});
// 2. To copy the state object from the console to the clipboard, follow these steps:
//    a. Right-click an object in Chrome's console and select Store as Global Variable from the context menu. It will return something like temp1 as the variable name.
//    b. Chrome also has a copy() method, so copy(temp1) in the console should copy that object to your clipboard.
//    ref: https://stackoverflow.com/a/25140576
//    ref: https://scottwhittaker.net/chrome-devtools/2016/02/29/chrome-devtools-copy-object.html
// 3. You can view the object in a json viewer like this one: http://jsonviewer.stack.hu/
// 4. You can compare two json objects here: http://www.jsondiff.com/
// end my add

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
