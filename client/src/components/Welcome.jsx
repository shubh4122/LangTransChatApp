import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (data) {
          setUserName(data.username);
        }
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (max-width: 428px) { /* iPhone 13 Pro Max width */
    img {
      height: 15rem; /* Adjusted height for iPhone 13 Pro Max */
    }
  }
`;
