// new code
import React, { useState, useEffect } from "react";
// import quoteBase from "../../quoteBase.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../ReComp/CopyButton";
import axios from "axios";
import "../MainComponents/MainCSS/mainpage.css";
import { API_ENDPOINT } from "../../quoteURL";
import Skeleton from "@mui/material/Skeleton";

const MainPage = () => {
  const url = API_ENDPOINT;
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // needed to prevent the same quote from being generated twice in a row
  const [previousIndex, setPreviousIndex] = useState(null);
  // needed in case there is only one quote in the database at the moment, so it won't run in infinite loop
  const [singleQuote, setSingleQuote] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);


  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(url);
      const quotes = response.data.data;
      let randomIndex = generateRandomIndex(quotes.length);
      if (quotes.length === 1) {
        setSingleQuote(true);
      } else {
        while (randomIndex === previousIndex) {
          randomIndex = generateRandomIndex(quotes.length);
        }
        setSingleQuote(false);
      }
      const quote = quotes[randomIndex].attributes.quote;
      const author = quotes[randomIndex].attributes.author;
      setQuote(quote);
      setAuthor(author);
      setPreviousIndex(randomIndex);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const generateRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  };

  const generateRandomQuote = () => {
    fetchRandomQuote();
  };

  useEffect(() => {
    document.title = "მთავარი | ციტატელი"; // Replace 'Custom Text' with your desired title
  }, []);

  const content = isDataFetched ? (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper" id="data-container">
        <div className="generatorBtn" id="generatorBtn">
          <button onClick={generateRandomQuote}>ახლის ჩვენება</button>
        </div>
        <div className="quote">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <div className="MP_textNcopy">
            <h3 className="generatedQuote">{quote}</h3>
            <CopyButton
              className="copy-btn"
              text={`„${quote}“ 
- ${author}`}
            />
          </div>
        </div>
        <div className="author">
          <FontAwesomeIcon icon={faPenNib} />
          <h3 className="generatedAuthor">{author}</h3>
        </div>
      </div>
    </div>
  ) : (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper" id="data-container">
        <div className="generatorBtn" id="generatorBtn">
          <button onClick={generateRandomQuote}>ახლის ჩვენება</button>
        </div>
        <div className="quote">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <div className="MP_textNcopy">
            <Skeleton
              animation="wave"
              variant="text"
              width="95%"
              height="30px"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="78%"
              height="30px"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="85%"
              height="30px"
            />
            <CopyButton
              className="copy-btn"
              text={`„${quote}“ 
- ${author}`}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="author"
        >
          <FontAwesomeIcon icon={faPenNib} />
          <Skeleton variant="text" width="40%" height="30px" />
        </div>
      </div>
    </div>
  );

  return content;
};

export default MainPage;
