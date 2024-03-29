import React, { useEffect } from "react";
import useRandomQuote from "../Hooks/ForMain/useRandomQuote";
import "../MainComponents/MainCSS/mainpage.css";
import QuoteDisplay from "./MiniComps/QuoteDisplay";

const MainPage = ({ darkMode }) => {
  const { quote, author, isDataFetched, generateRandomQuote } =
    useRandomQuote();

  useEffect(() => {
    document.title = "მთავარი | ციტატელი";
  }, []);

  return (
    <main className={`result rightDiv ${darkMode ? "dark-mode" : ""}`}>
      <div
        className={`result_wrapper rightDivWrapper ${
          darkMode ? "dark-mode" : ""
        }`}
        id="data-container"
      >
        <div className="generatorBtn" id="generatorBtn">
          <button onClick={generateRandomQuote}>ახლის ჩვენება</button>
        </div>
        <QuoteDisplay
          quote={quote}
          author={author}
          isLoading={!isDataFetched}
          darkMode={darkMode}
        />
      </div>
    </main>
  );
};

export default MainPage;
