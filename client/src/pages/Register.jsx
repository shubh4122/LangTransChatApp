import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import { countries } from "../utils/countries";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    language: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email, language } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (language === "") {
      toast.error("Please select your preferred language", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, language, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        language,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  const handleShowPw = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatBOOK</h1>
          </div>
          <input
            className="input"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            list="languages"
            name="language"
            className="input"
            placeholder="Enter preferred Language"
            onChange={(e) => handleChange(e)}
          />
          <datalist id="languages">
            {Object.keys(countries).map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>

          <div className="pwd">
            <input
              className="password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button type="button" className="showPw" onClick={handleShowPw}>
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <div className="pwd">
            <input
              className="password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="button" className="showPw" onClick={handleShowPw}>
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button className="button" type="submit">
            Create User
          </button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  .pwd {
    display: grid;
    grid-template-columns: 80% 20%;
    grid-column-gap: 3%;
    border: 0.1rem solid #4e0eff;
    padding: 1rem;
    border-radius: 0.4rem;
  }
  .password {
    // border: 0.1rem solid #4e0eff;
    border: none;
    background-color: transparent;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }

  .showPw {
    background-color: transparent;
    border: none;
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 2rem; /* Adjusted padding for iPhone 13 Pro Max */
    width: 90%; /* Adjusted width for iPhone 13 Pro Max */
    max-width: 500px; /* Added maximum width for better readability */
  }
  .input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  .button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 428px) {
    .brand {
      img {
        height: 3rem; /* Adjusted height for iPhone 13 Pro Max */
      }
      h1 {
        font-size: 1.2rem; /* Adjusted font size for iPhone 13 Pro Max */
      }
    }
  }
`;
