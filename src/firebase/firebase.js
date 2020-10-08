import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCuLaEGCNjQJ3sbYFc9WaVFdrQPfv0ugyQ',
  authDomain: 'journal-app-react-007.firebaseapp.com',
  databaseURL: 'https://journal-app-react-007.firebaseio.com',
  projectId: 'journal-app-react-007',
  storageBucket: 'journal-app-react-007.appspot.com',
  messagingSenderId: '726775791868',
  appId: '1:726775791868:web:e496f18cdf6588ef175779',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
