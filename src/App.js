import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";

import 'firebase/firestore';
import 'firebase/auth';
import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyDIZ1Gt6KqxVxkagJ9StLua29MxlrrwbNg",
  authDomain: "messenger-clone-1c4eb.firebaseapp.com",
  projectId: "messenger-clone-1c4eb",
  storageBucket: "messenger-clone-1c4eb.appspot.com",
  messagingSenderId: "416137967972",
  appId: "1:416137967972:web:2b533a05d4f14243ab6271",
  measurementId: "G-R3R50VZV3V",
});

const auth = firebase.auth();
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? <ChatRoom auth={auth} firestore={firestore} firebase={firebase} /> : <SignIn auth={auth} />}
    </div>
  )
}

export default App;
