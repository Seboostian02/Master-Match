import React, { useState } from "react";
import logo_light from "../../assets/logo.png";
import logo_dark from "../../assets/logo dark.png";
import search_icon_light from "../../assets/search_dark.png";
import search_icon_dark from "../../assets/search_white.png";
import toggle_dark from "../../assets/moon-icon-11.png";
import toggle_light from "../../assets/OIPPP.png";
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = ({ theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  async function handleSubmit(e) {
    e.preventDefault();

    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:8000/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      Cookies.remove("token");
      window.location.href = "/";
    } catch (error) {}
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const query = encodeURIComponent(searchTerm);
      window.location.href = `https://www.youtube.com/watch?v=xvFZjo5PgG0`;
    }
  };

  return (
    <div className="navbar">
      <img
        src={theme == "light" ? logo_light : logo_dark}
        alt=""
        className="logo"
      />
      <ul>
      <NavLink to="home">
          <li>Home</li>
        </NavLink>
        <NavLink to="/app/about">
          <li>About Us</li>
        </NavLink>
        <NavLink to="trainings">
          <li>Trainings</li>
        </NavLink>
        <NavLink to="questions">
          <li>Questions</li>
        </NavLink>
      </ul>
      <div className="search-box">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
         
        <img
          src={theme == "light" ? search_icon_light : search_icon_dark}
          alt=""
          className="imgAnimation"
        />
        </form>
      </div>
      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme == "light" ? toggle_dark : toggle_light}
        alt=""
        className="toggle imgAnimation"
      />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Details
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/app/my-profile" className="text-end">
            My Profile
          </Dropdown.Item>

          <Dropdown.Item href="/app/edit-profile" className="text-end">
            Edit Profile
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item
            as="button"
            className="text-end"
            onClick={handleSubmit}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  Navbar.propTypes = {
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
  };
};

export default Navbar;
