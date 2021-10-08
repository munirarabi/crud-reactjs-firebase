import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLrdppVfcwJKYEMsP0TTJID6BzJdv3PQA",
    authDomain: "app-pacientes-crud.firebaseapp.com",
    projectId: "app-pacientes-crud",
    storageBucket: "app-pacientes-crud.appspot.com",
    messagingSenderId: "219417203645",
    appId: "1:219417203645:web:5dd0946a2e165fbc5df8d4"
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()