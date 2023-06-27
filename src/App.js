import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//copybtn and search css
import "./Components/ReComp/RecompCSS/search.css";
//
// main components
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";
import AboutUs from "./Components/AboutUs/AboutUs";
import Filter from "./Components/Filter/Filter";
//
// filter result comps
import AuthorResult from "./Components/Filter/MiniFilter/FilterResult/AuthorResult";
import TopicResult from "./Components/Filter/MiniFilter/FilterResult/TopicResult";
import SourceResult from "./Components/Filter/MiniFilter/FilterResult/SourceResult";
//

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/author-results/:author" element={<AuthorResult />} />
        <Route path="/topic-results/:topic" element={<TopicResult />} />
        <Route path="/source-results/:source" element={<SourceResult />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
