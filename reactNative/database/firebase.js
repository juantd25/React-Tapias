import firebase from 'firebase';

import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDNRw7kjkLSSiWQObCSQvwgNU84fy2x7Lg',
  authDomain: 'react-native-firebase-d849c.firebaseapp.com',
  projectId: 'react-native-firebase-d849c',
  storageBucket: 'react-native-firebase-d849c.appspot.com',
  messagingSenderId: '883195010749',
  appId: '1:883195010749:web:e90c16365f275e2908a1d4',
  measurementId: 'G-9KJYRK4LGZ',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };
