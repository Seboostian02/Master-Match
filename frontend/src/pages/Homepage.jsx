import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuth(!!token);
  }, [isAuth]);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}
