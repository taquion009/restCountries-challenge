import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [dark, setDark] = useState(false);
  const handleTheme = () => {
    if (document.body.classList.value === "theme-light") {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
      setDark(false);
    } else if (localStorage.getItem("theme") === "dark") {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
      setDark(true);
    }
  }, []);

  return (
    <header>
      <div className="container-header">
        <h1>
          <Link to="/">Where in the world?</Link>
        </h1>
        <button onClick={handleTheme}>
          <span>{dark ? <Moon /> : <MoonOutline />}</span>
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

const MoonOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="hsl(207, 26%, 17%)f"
    className="ionicon"
    viewBox="0 0 512 512"
  >
    <title>Moon</title>
    <path
      d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    fill="hsl(0, 0%, 100%)"
    viewBox="0 0 512 512"
  >
    <title>Moon</title>
    <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z" />
  </svg>
);
