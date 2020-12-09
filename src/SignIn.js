import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import React from "react";

function SignIn(props) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  };
  return (
    <div>
      <h1>Login In with Google</h1>
      <Button onClick={signInWithGoogle}>Sign In</Button>
    </div>
  );
}

export default SignIn;
