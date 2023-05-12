import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";
import AboutUs from "./Components/AboutUs/AboutUs";
// import Filter from "./Components/Filter/Filter";

function App() {
  return (
    <div className="App">
      <Sidebar />
      {/* <MainPage /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
