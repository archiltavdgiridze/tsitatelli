import { useState, useEffect } from "react";
import tsitatelliDB from "../../../quoteURL";

const useRandomQuote = () => {
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

  // picks a random quote from the local database
  const fetchRandomQuote = async () => {
    try {
      const quotes = tsitatelliDB.data;

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
