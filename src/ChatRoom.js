import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import SignOut from "./SignOut";

import firebase from "firebase/app";
import styled from "styled-components";
import Button from './Button.js';

const AppDiv = styled.div`
  width: 90vh;
  background-color: #181a1b;
  color: white;
  main{
  height: 82vh;
  overflow:scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 10px;
	background-color: transparent;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #008BFE;
    border-radius: 1rem;
  }
  }
`;

const Form = styled.form`
  display:flex;
  justify-content: center;
  width: 90%;
  margin: 10px;
  overflow: hidden;
  border-radius: .5rem;
`;

const Header = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px; 
background-color: black;
img{
  width: 50px;
}

`;

const Input = styled.input`
  width: 100%;
  background-color: black;
  color: white;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
  &::placeholder{
    font-size: 1rem;
    color: white;
  }
  &:focus::placeholder{
    color: transparent;
  }
`;


function ChatRoom(props) {
  const { auth, firestore } = props;
  const dummy = useRef();
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [inputValue, setInputValue] = useState("");

  const onTextChange = event => {
    setInputValue(event.target.value);
  };

  const sendMessage = async event => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    const { uid, photoURL } = auth.currentUser;
    setInputValue("");

    await messageRef.add({
      text: inputValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      username: auth.currentUser.displayName,
    });

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppDiv>
      <Header>
        <div>
          <img src={auth.currentUser.photoURL} />
        </div>
        <h1>Messenger</h1>
        <SignOut auth={auth} />
      </Header>
      <main>
        {messages &&
          messages.map(msg => (
            <Message message={msg} key={msg.id} auth={auth} />
          ))}
        <div ref={dummy}></div>
      </main>
      <Form onSubmit={sendMessage}>
        <Input placeholder="Type your message..." onChange={onTextChange} value={inputValue} />
        <Button duration="1000" width="100" height="40">
          Send
          </Button>
      </Form>
    </AppDiv>
  );
}

export default ChatRoom;
