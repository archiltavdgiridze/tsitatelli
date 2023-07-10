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

const MainPage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // needed to prevent the same quote from being generated twice in a row
  const [previousIndex, setPreviousIndex] = useState(null);
  // needed in case there is only one quote in the database at the moment, so it won't run in infinite loop
  const [singleQuote, setSingleQuote] = useState(false);

  const url = API_ENDPOINT;

  // async function logJSONData() {
  //   const response = await fetch(url);
  //   const jsonData = await response.json();
  //   console.log(jsonData.data[5].attributes.topic);
  // }

  // logJSONData();

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


  return (
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
  );
};

export default MainPage;
