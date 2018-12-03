import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers';
// import myReducers from './my-reducers' // my add
// begin insert from marioplan/store/reducers/rootReducer
// import authReducer from './authReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
// end insert from marioplan

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        ...asyncReducers,

        // begin insert from marioplan
        // auth: authReducer,
        firestore: firestoreReducer,
        firebase: firebaseReducer,
        // end insert from marioplan
    });

export default createReducer;

// the key name will be the data property on the state object