import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
//copybtn and search css
import "./Components/ReComp/RecompCSS/searchbar.css";
//
// main components
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";
import Filter from "./Components/Filter/Filter";
import Generator from "./Components/Generator/Generator";
import AboutUs from "./Components/AboutUs/AboutUs";
//
// filter result comps
import AuthorResult from "./Components/Filter/MiniFilter/FilterResult/AuthorResult";
import TopicResult from "./Components/Filter/MiniFilter/FilterResult/TopicResult";
import SourceResult from "./Components/Filter/MiniFilter/FilterResult/SourceResult";
import Search from "./Components/Search/Search";
import ErrorComp from "./Components/404/ErrorComp";
//
import ReactGA from "react-ga";

function initializeReactGA() {
  ReactGA.initialize("YOUR_TRACKING_ID"); // Replace 'YOUR_TRACKING_ID' with your actual tracking ID
  ReactGA.pageview(window.location.pathname + window.location.search);
}

initializeReactGA();

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<MainPage darkMode={darkMode} />} />
        <Route path="/filter" element={<Filter darkMode={darkMode} />} />
        <Route
          path="/filter/author-results/:author"
          element={<AuthorResult darkMode={darkMode} />}
        />
        <Route
          path="/filter/topic-results/:topic"
          element={<TopicResult darkMode={darkMode} />}
        />
        <Route
          path="/filter/source-results/:source"
          element={<SourceResult darkMode={darkMode} />}
        />
        <Route path="/search" element={<Search darkMode={darkMode} />} />
        <Route path="/generator" element={<Generator darkMode={darkMode} />} />
        <Route path="/about_us" element={<AboutUs darkMode={darkMode} />} />
        <Route path="*" element={<ErrorComp darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
