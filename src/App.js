import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";
import AboutUs from "./Components/AboutUs/AboutUs";
//
import Filter from "./Components/Filter/Filter";
import AuthorFilt from "./Components/Filter/MiniFilter/AuthorFilt";
// 
import AuthorResult from "./Components/Filter/MiniFilter/FilterResult/AuthorResult";
// 


function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filter" element={<Filter />} />
          <Route path="/author-results/:author" element={<AuthorResult />} />
          {/* TODO add route to topics and sources like author */}
          {/* <Route path="/topic-results/:topic" element={<Filtered />} /> */}
          {/* <Route path="/source-results/:source" element={<Filtered />} /> */}
        <Route path="/about_us" element={<AboutUs />} />
        {/* <Route path="/filter_by_authors" element={<FilterByAuthors />} /> */}
      </Routes>
    </div>
  );
}

export default App;
