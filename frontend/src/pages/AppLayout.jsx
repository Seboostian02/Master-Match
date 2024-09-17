import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/Navbar/Navbar.css";
import Body from "../components/Body/Body";
import "../components/Body/Body.css";
import Footer from "../components/Footer/Footer";
import "../components/Footer/Footer.css";

function AppLayout() {
  const currentTheme = localStorage.getItem("currentTheme");

  const [theme, setTheme] = useState(currentTheme ? currentTheme : "light");

  useEffect(() => {
    localStorage.setItem("currentTheme", theme);
  }, [theme]);

  return (
    <div className={`containerrr ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Body theme={theme} setTheme={setTheme} />
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default AppLayout;
