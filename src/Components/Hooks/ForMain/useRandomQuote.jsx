import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from "../../../quoteURL";

const useRandomQuote = () => {
  const url = API_ENDPOINT;
  // sets and stores quote and author
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // needed to prevent the same quote from being generated twice in a row
  const [previousIndex, setPreviousIndex] = useState(null);
  // needed in case there is only one quote in the database at the moment, so it won't run in infinite loop
  const [singleQuote, setSingleQuote] = useState(false);
  // used to display skeleton while data is being fetched
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  // console.log(url);

  // fetches random quote from the database
  const fetchRandomQuote = async () => {
    try {
      // const response = await axios.get(url);
      // const response = url.data;
      // console.log(response);
      // const quotes = response.data.data;
      const quotes = API_ENDPOINT.data;
      console.log(quotes);

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

  // generates random quote
  const generateRandomQuote = () => {
    fetchRandomQuote();
  };

  return { quote, author, isDataFetched, generateRandomQuote };
};

export default useRandomQuote;
