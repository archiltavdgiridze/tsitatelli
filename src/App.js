import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";
import AboutUs from "./Components/AboutUs/AboutUs";
import FilterByAuthors from "./Components/FilterByAuthors/FilterByAuthor";
import Filtered from "./Components/FilterByAuthors/Filtered";
import { useEffect, useState } from "react";

// import Filter from "./Components/Filter/Filter";



function App() {


  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filter_by_authors" element={<FilterByAuthors />} />
        <Route path="/filtered" element={<Filtered />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
