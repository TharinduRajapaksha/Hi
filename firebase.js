import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
//import React, { useState } from 'react';
var firebaseConfig = {
    apiKey: "AIzaSyBAbEVem85sY3nOoVMNpUkLdh2cgJwY0uE",
    authDomain: "chatapp-1a364.firebaseapp.com",
    projectId: "chatapp-1a364",
    storageBucket: "chatapp-1a364.appspot.com",
    messagingSenderId: "533573912532",
    appId: "1:533573912532:web:6729a21c35286cfe3cb841"
  };
  
  let app;
  if (firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig);
  }else{
      app = firebase.app();
  }

const db = app.firestore();
const auth = firebase.auth();

export { db, auth};