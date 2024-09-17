import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  console.log(isAuth);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    setIsAuth(!!access_token);
  }, [isAuth]);

  console.log(isAuth);
  return (
    <>
      {isAuth && (
        <Nav.Link as={NavLink} to="login" exact activeClassName="active">
          Login
        </Nav.Link>
      )}
    </>
  );
}
