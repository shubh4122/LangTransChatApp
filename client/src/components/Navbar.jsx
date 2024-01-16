import styled from "styled-components";
import Logo from "../assets/logo.svg";
import LangTranslation from "../assets/langChangeBtn.png";

const Navbar = () => {
  return (
    <Container>
      <nav className="navbar">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>chatBOOK</h3>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>

        <div className="dropdown">
          <button className="dropbtn">
            <img src={LangTranslation} />
          </button>
          <div className="dropdown-content">
            <form>
              <h3>Default language:</h3>
              <br />
              <input type="radio" id="en" name="radiogroup" value="English" />
              <label htmlFor="en">English</label>
              <br />
              <input type="radio" id="fr" name="radiogroup" value="French" />
              <label htmlFor="fr">French</label>
              <br />
              <input type="radio" id="it" name="radiogroup" value="Italian" />
              <label htmlFor="it">Italian</label>
              <br />
              <input type="radio" id="de" name="radiogroup" value="German" />
              <label htmlFor="de">German</label>
            </form>
          </div>
        </div>
      </nav>
    </Container>
  );
};

/**
 * CSS NOTES:
 * 1. to make Container fill all the space below navbar, use calc() function. (done in Chat.jsx)
 */
const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff10;
  //   width: 99%;
  // border: 1px solid white;
  //   border-radius: 20px;

  .navbar {
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 10% 85% 5%;
    grid-template-rows: 100%;
    //imp as without this there was an overflow/ divs size was huge.
    // column-gap: 30px;
    // padding-left: 20px;
    // align-items: center;
    // overflow: hidden;
    // border-radius: 20px;
    // border: 1px solid white;
  }
  .brand {
    // border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    img {
      //   border: 1px solid white;
      height: 2rem;
    }
    h3 {
      //   border: 1px solid white;
      color: white;
      text-transform: uppercase;
    }
  }
  .search-box {
    // border: 1px solid white;
    display: flex;
    align-items: center;
    padding-left: 100px;
    padding-right: 100px;
  }

  .search-box input {
    padding: 10px;
    border: 1px solid #4e0eff95;
    border-radius: 5px;
    margin-right: 5px;
    color: white;
    background-color: #131324;
    width: 95%;
  }

  .search-box button {
    padding: 10px 15px;
    background-color: #4e0eff30;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .dropdown {
    // border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dropbtn {
    background-color: #fff000;
    color: #333;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 60px;
    right: 10px;
    color: white;
    z-index: 1;
    background-color: #2b1f5980;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 12px 16px;
    input{
        margin: 10px;
    }
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

export default Navbar;
