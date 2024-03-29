import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducer
import notifyReducer from './reducer/NotifyReducer';

const firebaseConfig = {
    apiKey: "AIzaSyBrelAXvtqMi70YT0i0RJ2nfIZ8OBMqSgg",
    authDomain: "reactclientpanel-2d6b5.firebaseapp.com",
    databaseURL: "https://reactclientpanel-2d6b5.firebaseio.com",
    projectId: "reactclientpanel-2d6b5",
    storageBucket: "reactclientpanel-2d6b5.appspot.com",
    messagingSenderId: "76331435414"
};

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
//const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer
});
// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);




export default store;
