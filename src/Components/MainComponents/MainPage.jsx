import React, { useState, useEffect } from "react";
// import quoteBase from "../../quoteBase.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../ReComp/CopyButton";

import axios from "axios";



const MainPage = () => {
  
  // old code, just in case //
  // ~ this code generates a random quote when the component mounts
  // useEffect(() => {
  // generateRandomQuote();
  // }, []);

  // ~ this function generates a random quote
  // function generateRandomQuote() {
  //   const randomIndex = Math.floor(Math.random() * quoteBase.length);
  //   setQuote(quoteBase[randomIndex].quote);
  //   setAuthor(quoteBase[randomIndex].nameSurname);
  // }

  // ~ this function generates a new quote
  // function genQuote() {
  //   const randomIndex = Math.floor(Math.random() * quoteBase.length);
  //   setQuote(quoteBase[randomIndex].quote);
  //   setAuthor(quoteBase[randomIndex].nameSurname);
  //   const quoteElement = document.querySelector(".quote h3");
  //   quoteElement.classList.remove("templateText");
  //   // console.log(quoteBase[randomIndex]);
  // }
  // old code ^ //
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  async function logJSONData() {
    let url =
      "https://dev-meshveliani-apis.pantheonsite.io/jsonapi/node/tsitateli_api";
    const response = await fetch(url);
    const jsonData = await response.json();
    // console.log(jsonData);
  }

  logJSONData();

  function generateRandomQuote() {
    axios
      .get(
        "https://dev-meshveliani-apis.pantheonsite.io/jsonapi/node/tsitateli_api"
      )
      .then((response) => {
        const quotes = response.data.data;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex].attributes.field_quote;
        const author = quotes[randomIndex].attributes.field_author;
        setQuote(quote);
        console.log(quote);
        setAuthor(author);
        console.log(author);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        // Handle error
      });
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://dev-meshveliani-apis.pantheonsite.io/jsonapi/node/tsitateli_api"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data in the state
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper" id="data-container">
        <div className="generatorBtn" id="generatorBtn">
          {/* <button onClick={genQuote}>ახლის ჩვენება</button> */}
          <button onClick={generateRandomQuote}>ახლის ჩვენება</button>
        </div>
        <div className="quote">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <div className="MP_textNcopy">
            <h3 className="generatedQuote">{quote}</h3>
            <CopyButton
              text={`"${quote}" - ${author}`}
              className="copy-btn"
              style={{}}
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
