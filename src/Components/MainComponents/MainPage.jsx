import React, {useState, useEffect} from "react";
import quoteBase from "../../quoteBase.json";

const MainPage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  
  function genQuote() {
    const randomIndex = Math.floor(Math.random() * quoteBase.length);
    setQuote(quoteBase[randomIndex].quote);
    setAuthor(quoteBase[randomIndex].nameSurname);
  }

  return (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper" id="data-container">
        <div className="generatorBtn" id="generatorBtn">
          <button onClick={genQuote}>ახლის გენერირება</button>
        </div>
        <div className="quote">
          <i className="fa-solid fa-quote-left"></i>
          <h3 className="generatedQuote">{quote}</h3>
        </div>
        <div className="author">
          <i className="fa-solid fa-pen-nib"></i>
          <h3 className="generatedAuthor">{author}</h3>
        </div>
      </div>
      <div className="dev-info">
        <p>*საიტი არის დეველოპმენტის პროცესში*</p>
      </div>
    </div>
  );
};

export default MainPage;
