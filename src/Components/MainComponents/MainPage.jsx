import React from "react";

const MainPage = () => {
  return (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper" id="data-container">
        <div className="generatorBtn" id="generatorBtn">
          <button>ახლის გენერირება</button>
        </div>
        <div className="quote">
          <i className="fa-solid fa-quote-left"></i>
          <h3 className="generatedQuote">ციტატის ადგილი</h3>
        </div>
        <div className="author">
          <i className="fa-solid fa-pen-nib"></i>
          <h3 className="generatedAuthor">ავტორის ადგილი</h3>
        </div>
      </div>
      <div className="dev-info">
        <p>*საიტი არის დეველოპმენტის პროცესში*</p>
      </div>
    </div>
  );
};

export default MainPage;
