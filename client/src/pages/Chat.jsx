import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Navbar from "../components/Navbar";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const checkLocalStorage = async () => {
      const storedData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (!storedData) {
        navigate("/login");
      } else {
        try {
          const userData = await JSON.parse(storedData);
          setCurrentUser(userData);
        } catch (error) {
          // Handle JSON parsing errors, e.g., show an error message to the user
          console.error("Error parsing data:", error);
        }
      }
    };
    checkLocalStorage();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(response.data);
          } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.error("Error fetching data:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <Navbar currentUser={currentUser} changeChat={handleChatChange} />
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
  background-color: #131324;

  .container {
    height: calc(100vh - 60px); /* Adjusted height for iPhone 13 Pro Max */
    width: 100%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 100%; /* Single column layout for mobile */
    
    @media screen and (min-width: 428px) { /* iPhone 13 Pro Max width */
      grid-template-columns: 25% 75%; /* Adjusted columns for larger screens */
    }
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%; /* Adjusted columns for medium-sized screens */
    }
  }
`;
