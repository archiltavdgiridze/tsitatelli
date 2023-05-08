import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Sidebar from "./Components/MainComponents/Sidebar";
import MainPage from "./Components/MainComponents/MainPage";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Sidebar />
      <MainPage />
    </div>
  );
}

export default App;
