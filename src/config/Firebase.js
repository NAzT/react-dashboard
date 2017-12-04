import * as firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyDjKtk-mfuS_g3ZnWI4NX2x5ynUQU1Y3og',
  authDomain: 'performance-182414.firebaseapp.com',
  databaseURL: 'https://performance-182414.firebaseio.com',
  projectId: 'performance-182414',
  storageBucket: 'performance-182414.appspot.com',
  messagingSenderId: '779931616641'
}

firebase.initializeApp(config)

export default firebase