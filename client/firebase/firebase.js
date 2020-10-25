import * as firebase from 'firebase';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCq3aWcvaoq5xLwzep7-IaUDSPBDr3e_iQ',
  authDomain: 'hacktx2020-85bfd.firebaseapp.com',
  databaseURL: 'https://hacktx2020-85bfd.firebaseio.com',
  projectId: 'hacktx2020-85bfd',
  storageBucket: 'hacktx2020-85bfd.appspot.com',
  messagingSenderId: '54499110565',
  appId: '1:54499110565:web:1856651e52820f4deaa74c',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
