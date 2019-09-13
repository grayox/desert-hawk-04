import * as reduxModule from 'redux';
import { applyMiddleware, compose, createStore, } from 'redux';
import createReducer from 'store/reducers';
import thunk from 'redux-thunk';

// begin insert from marioplan
import { reduxFirestore, getFirestore, } from 'redux-firestore';
import { reactReduxFirebase, getFirebase, } from 'react-redux-firebase';
// import firebaseConfig from './config/firebaseConfig'
// import firebaseConfig from './app/config/firebaseConfig'
import { firebaseConfig, } from 'app/config/AppConfig.js'
// import rootReducer from './store/reducers/rootReducer'
// import rootReducer from './app/store/reducers/marioplan/rootReducer'
// end insert from marioplan

// begin insert from react-redux-firebase
// import firebase from 'firebase';
import firebase from 'firebase/app';
// http://react-redux-firebase.com/docs/v2-migration-guide.html
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}
// initialize firebase instance
// corrects error
// error message:
// Error: The Firebase auth state could not be found in the store under the attribute 'firebase.auth'. Make sure your react-redux-firebase reducer is correctly set in the store
// the above error might also require correction by ensuring src/store/reducers/index.js has been correctly copied and updated
// the latest occurence of this error was due to the file src/store/reducers/index.js in src/app/config/upgrade/xfer.txt
// failing to be picked up by the IFS in the read command initiating the `while IFS= ...` loop in src/app/config/upgrade/copy.sh
// this was fixed by changing the while loop to read `while IFS= read -r fullfile || [ -n "$fullfile" ];`
// as described here: https://stackoverflow.com/a/12919766
firebase.initializeApp(firebaseConfig) // new to v2.*.*
// firebase.firestore() // needed if using firestore

// index.js:1452 [2019-08-11T18:42:34.650Z]  @firebase/firestore: Firestore (6.3.4): 
// The timestampsInSnapshots setting now defaults to true and you no
// longer need to explicitly set it. In a future release, the setting
// will be removed entirely and so it is recommended that you remove it
// from your firestore.settings() call now.
// const firestore = firebase.firestore();
// const settings = {
//   // your settings...
//   timestampsInSnapshots: true
// };
// firestore.settings(settings);

// end insert from react-redux-firebase

// begin patch
// Fix for Firefox redux dev tools extension
// https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';
// end patch

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
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore, })),
  // reactReduxFirebase(firebaseConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
  // reduxFirestore(firebaseConfig) // redux bindings for firestore
  // end insert from marioplan

  // begin insert from react-redux-firebase
  // http://react-redux-firebase.com/docs/v2-migration-guide.html
  reactReduxFirebase( firebase, rrfConfig, ), // pass in firebase instance instead of config
  reduxFirestore( firebase, ) // <- needed if using firestore
  // applyMiddleware(...middleware) // to add other middleware
  // end insert from react-redux-firebase
);

const store = createStore( createReducer(), enhancer, );
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
  // // global state
  // console.log( 'state\n', store.getState(), );
  // // global debugger
  // // debugger;
});
// 2. To copy the state object from the console to the clipboard, follow these steps:
//    a. Right-click an object in Chrome's console and select Store as Global Variable from the context menu. It will return something like temp1 as the variable name.
//    b. Chrome also has a copy() method, so copy(temp1) in the console should copy that object to your clipboard.
//    ref: https://stackoverflow.com/a/25140576
//    ref: https://scottwhittaker.net/chrome-devtools/2016/02/29/chrome-devtools-copy-object.html
// 3. You can view the object in a json viewer like this one: http://jsonviewer.stack.hu/
// 4. You can compare two json objects here: http://www.jsondiff.com/
// end my add

export const injectReducer = ( key, reducer, ) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
