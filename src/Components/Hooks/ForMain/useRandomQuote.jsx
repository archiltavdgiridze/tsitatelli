import { useState, useEffect, useRef } from "react";
import { fetchQuotesData } from "../../../lib/fetchQuotes";

const useRandomQuote = () => {
  // sets and stores quote and author
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // needed to prevent the same quote from being generated twice in a row
  const [previousIndex, setPreviousIndex] = useState(null);
  // used to display skeleton while data is being fetched
  const [isDataFetched, setIsDataFetched] = useState(false);
  const quotesRef = useRef([]);

  useEffect(() => {
    fetchQuotesData()
      .then(({ data }) => {
        quotesRef.current = data;
        pickRandomQuote();
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  const generateRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  };

  const pickRandomQuote = () => {
    const quotes = quotesRef.current;
    if (quotes.length === 0) return;

    let randomIndex = generateRandomIndex(quotes.length);
    if (quotes.length > 1) {
      while (randomIndex === previousIndex) {
        randomIndex = generateRandomIndex(quotes.length);
      }
    }

    setQuote(quotes[randomIndex].attributes.quote);
    setAuthor(quotes[randomIndex].attributes.author);
    setPreviousIndex(randomIndex);
    setIsDataFetched(true);
  };

  // generates random quote from the already-fetched list
  const generateRandomQuote = () => {
    pickRandomQuote();
  };

  return { quote, author, isDataFetched, generateRandomQuote };
};

export default useRandomQuote;
