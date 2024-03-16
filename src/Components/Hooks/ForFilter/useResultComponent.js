import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tsitatelliDB from "../../../quoteURL";

const useResultComponent = (pageType) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [resultName, setResultName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(20);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const nameFromURL = decodeURIComponent(
        window.location.pathname.split("/")[3]
      );
      const decodedResultName = nameFromURL.replace(/_/g, " ");
      setResultName(decodedResultName);
      fetchQuotes(decodedResultName);
    } else {
      const quotes = state.filteredQuotes;
      setResultName(quotes[0]?.attributes[pageType] || "");
      setFilteredQuotes(quotes);
    }
  }, [pageType, state]);

  const splitTopics = (topics) => {
    if (typeof topics === "string") {
      return topics.split(",");
    } else if (Array.isArray(topics)) {
      return topics.join(",").split(",");
    } else {
      return [];
    }
  };

  // Fetch quotes from local JSON data
  const fetchQuotes = (name) => {
    let filteredQuotes = tsitatelliDB.data;
    if (pageType === "author") {
      filteredQuotes = filteredQuotes.filter(
        (quote) => quote.attributes.author === name
      );
    } else if (pageType === "source") {
      filteredQuotes = filteredQuotes.filter(
        (quote) => quote.attributes.source === name
      );
    } else if (pageType === "topic") {
      filteredQuotes = filteredQuotes.filter((quote) =>
        quote.attributes.topic.includes(name)
      );
    }
    setResultName(name);
    setFilteredQuotes(filteredQuotes);
  };

  useEffect(() => {
    // Use fetchQuotes function to get quotes based on pageType
    if (!state?.filteredQuotes) {
      const nameFromURL = decodeURIComponent(
        window.location.pathname.split("/")[3]
      );
      const decodedResultName = nameFromURL.replace(/_/g, " ");
      setResultName(decodedResultName);
      fetchQuotes(decodedResultName); // Call fetchQuotes function here
    } else {
      const quotes = state.filteredQuotes;
      setResultName(quotes[0]?.attributes[pageType] || "");
      setFilteredQuotes(quotes);
    }
  }, [pageType, state]);

  const handleGoBack = () => {
    navigate("/filter");
  };

  const handleAuthorClick = (authorName) => {
    const encodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/filter/author-results/${encodedAuthorName}`);
  };

  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/[-\s]/g, "_")
    );
    navigate(`/filter/topic-results/${decodedTopicName}`);
  };

  const handleSourceClick = (sourceName) => {
    const encodedSourceName = encodeURIComponent(
      sourceName.replace(/\s+|-/g, "_")
    );
    navigate(`/filter/source-results/${encodedSourceName}`);
  };

  const handleCardClick = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null); // Close the expanded div
    } else {
      setActiveCardIndex(index);
    }
  };

  const quoteCount = filteredQuotes.length;

  useEffect(() => {
    let metaDescription = "";

    if (pageType === "author") {
      metaDescription = `${resultName} ციტატები | ${quoteCount} ციტატა.`;
    } else if (pageType === "topic") {
      metaDescription = `ციტატები ${resultName}–ზე | ${quoteCount} ციტატა.`;
    } else if (pageType === "source") {
      metaDescription = `ციტატები "${resultName}"–დან | ${quoteCount} ციტატა.`;
    }

    document.title = `${resultName} | ციტატელი`; // Update the tab name with the result's name
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute("content", metaDescription); // Update the meta description
    } else {
      // If the meta tag doesn't exist, create and append it to the head
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("name", "description");
      newMetaTag.setAttribute("content", metaDescription);
      document.head.appendChild(newMetaTag);
    }
  }, [resultName, quoteCount, pageType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(
    indexOfFirstQuote,
    indexOfLastQuote
  );
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > getYOffsetThreshold());
    };

    const getYOffsetThreshold = () => {
      return window.innerWidth >= 1024 ? 135 : 125; // Change the values as per your requirement
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    resultName,
    filteredQuotes,
    handleGoBack,
    handleAuthorClick,
    handleTopicClick,
    handleSourceClick,
    handleCardClick,
    activeCardIndex,
    splitTopics,
    setActiveCardIndex,
    currentPage,
    handlePageChange,
    currentQuotes,
    totalPages,
    quoteCount,
    isScrolled,
    quotesPerPage,
  };
};

export default useResultComponent;
