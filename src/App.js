import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
//copybtn and search css
import "./Components/ReComp/RecompCSS/search.css";
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
//

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <HelmetProvider>
        <Helmet>
          <meta
            property="og:image"
            content="https://tsitatelli.vercel.app/assets/images/tsitatelli-meta-img.jpg"
          />
        </Helmet>
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<MainPage darkMode={darkMode} />} />
          <Route path="/filter" element={<Filter darkMode={darkMode} />} />
          <Route
            path="/author-results/:author"
            element={<AuthorResult darkMode={darkMode} />}
          />
          <Route
            path="/topic-results/:topic"
            element={<TopicResult darkMode={darkMode} />}
          />
          <Route
            path="/source-results/:source"
            element={<SourceResult darkMode={darkMode} />}
          />
          <Route
            path="/generator"
            element={<Generator darkMode={darkMode} />}
          />
          <Route path="/about_us" element={<AboutUs darkMode={darkMode} />} />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
