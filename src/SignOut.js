import React from "react";
import Button from "./Button";

function SignOut(props) {
  return (
    props.auth.currentUser && (
      <div onClick={() => props.auth.signOut()}>
        <Button width="100" height="35" radius="20" >Sign Out</Button>
      </div>
    )
  );
}

export default SignOut;
