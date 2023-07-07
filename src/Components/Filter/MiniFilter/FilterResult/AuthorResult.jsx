import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import PaginationComponent from "../../../ReComp/Pagination";

const AuthorResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authorName, setAuthorName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(15);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const authorFromURL = decodeURIComponent(
        window.location.pathname.split("/")[2]
      );
      const decodedAuthorName = authorFromURL.replace(/_/g, " ");
      setAuthorName(decodedAuthorName);
      fetchQuotesByAuthor(decodedAuthorName);
    } else {
      const quotes = state.filteredQuotes;
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const fetchQuotesByAuthor = (authorName) => {
    const apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[author]=${authorName}`;
    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        setFilteredQuotes(filteredQuotes);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

  const splitTopics = (topics) => {
    if (typeof topics === "string") {
      return topics.split(",");
    } else if (Array.isArray(topics)) {
      return topics.join(",").split(",");
    } else {
      return [];
    }
  };

  const handleGoBack = () => {
    navigate("/filter");
  };

  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/[-\s]/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleSourceClick = (sourceName) => {
    const decodedSourceName = encodeURIComponent(
      sourceName.replace(/[-\s]/g, "_")
    );
    navigate(`/source-results/${decodedSourceName}`);
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

  return (
    <div className={`result filt_elem_result ${isScrolled ? "scrolled" : ""}`}>
      <div className={`topBar ${isScrolled ? "scrolled" : ""}`}>
        <button className="backButton" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {authorName && (
          <h1 className="filtered_authorName result_title">
            {authorName} | {quoteCount}
          </h1>
        )}
      </div>

      <div className="cards">
        {currentQuotes.map((data, index) => (
          <figure key={data.id} className="quote_card">
            <div
              className={`info_btn ${
                activeCardIndex === index ? "active" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <FontAwesomeIcon className="quote_info" icon={faCircleInfo} />
            </div>
            <figcaption className="q_card_top">
              <h2>„{data.attributes.quote}“</h2>
            </figcaption>
            <figcaption
              className={`q_card_bottom ${
                activeCardIndex === index ? "active" : ""
              }`}
              style={{ display: activeCardIndex === index ? "flex" : "none" }}
            >
              <div className="q_card_buttons">
                <div className="top_group_buttons">
                  <p className="group_title">წყარო:</p>
                  <button
                    className="linker_source linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
                  >
                    <p>{data.attributes.source}</p>
                  </button>
                </div>
                <div className="bottom_group_buttons">
                  <p className="group_title">თემატიკა:</p>
                  {splitTopics(data.attributes.topic).map(
                    (topic, topicIndex) => (
                      <button
                        key={`${data.id}_${topicIndex}`}
                        className="linker_topic linkers"
                        onClick={() => handleTopicClick(topic)}
                      >
                        <p>{topic}</p>
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="card_copy">
                <CopyButton
                  text={`„${data.attributes.quote}“ 
- ${authorName}`}
                  className="copy-btn btn_filled"
                />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {/* pagination */}
      {filteredQuotes.length > quotesPerPage && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AuthorResult;
