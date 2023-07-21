import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useResultComponent = (pageType) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [resultName, setResultName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(10);
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

  useEffect(() => {
    document.title = `${resultName} | ციტატელი`; // Update the tab name with the result's name
  }, [resultName]);

  const fetchQuotes = (name) => {
    let apiUrl;
    if (pageType === "author") {
      apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[author]=${name}`;
    } else if (pageType === "source") {
      apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[source]=${name}`;
    } else if (pageType === "topic") {
      const decodedTopicName = name.replace(/[-–]/g, " ");
      apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[topic]=${decodedTopicName}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        const formattedResultName = name.replace(/–/g, " ");
        setResultName(formattedResultName);
        setFilteredQuotes(filteredQuotes);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

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
