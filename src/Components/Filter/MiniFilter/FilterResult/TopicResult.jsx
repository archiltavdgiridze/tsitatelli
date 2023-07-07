import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import PaginationComponent from "../../../ReComp/Pagination";

// import MailTo from "../../../AboutUs/MailTo";

const TopicResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [topicName, setTopicName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  // const [hoveredAuthor, setHoveredAuthor] = useState(null);
  // const [hoveredSource, setHoveredSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(8);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const topicFromURL = decodeURIComponent(
        window.location.pathname.split("/")[2]
      );
      const decodedTopicName = topicFromURL.replace(/_/g, " ");
      fetchQuotesByTopic(decodedTopicName);
    } else {
      const quotes = state.filteredQuotes;
      setTopicName(quotes[0]?.attributes.topic || "");
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const fetchQuotesByTopic = (topicName) => {
    const decodedTopicName = topicName.replace(/[-–]/g, " ");

    const apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[topic]=${decodedTopicName}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        const formattedTopicName = decodedTopicName.replace(/–/g, " ");
        setTopicName(formattedTopicName);
        setFilteredQuotes(filteredQuotes);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

  const handleGoBack = () => {
    navigate("/filter");
  };

  // ~ Author
  const handleAuthorClick = (authorName) => {
    const encodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/author-results/${encodedAuthorName}`);
  };

  // const handleAuthorHover = (index) => {
  //   setHoveredAuthor(index);
  // };

  // const handleAuthorHoverLeave = () => {
  //   setHoveredAuthor(null);
  // };

  // ~ Source
  const handleSourceClick = (sourceName) => {
    const encodedSourceName = encodeURIComponent(
      sourceName.replace(/\s+|-/g, "_")
    );
    navigate(`/source-results/${encodedSourceName}`);
  };

  // const handleSourceHover = (index) => {
  //   setHoveredSource(index);
  // };

  // const handleSourceHoverLeave = () => {
  //   setHoveredSource(null);
  // };

  const handleCardClick = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null); // Close the expanded div
    } else {
      setActiveCardIndex(index);
    }
  };

  const handleCardCloseClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the card div
    setActiveCardIndex(null);
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

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {topicName && (
        <h1 className="filtered_topicName result_title ">
          {topicName} | {quoteCount}
        </h1>
      )}
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
                  <p className="group_title">ავტორი:</p>
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleAuthorClick(data.attributes.author)}
                    // onMouseEnter={() => handleAuthorHover(index)}
                    // onMouseLeave={handleAuthorHoverLeave}
                  >
                    <p>{data.attributes.author}</p>
                  </button>
                </div>
                {/* <div
                      className={`info_div ${
                        hoveredAuthor === index ? "active" : ""
                      }`}
                    >
                      ავტორის სხვა ციტატები
                    </div> */}
                <div className="bottom_group_buttons">
                  <p className="group_title">წყარო:</p>
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
                    // onMouseEnter={() => handleSourceHover(index)}
                    // onMouseLeave={handleSourceHoverLeave}
                  >
                    <p>{data.attributes.source}</p>
                    {/* <div
                      className={`info_div ${
                        hoveredSource === index ? "active" : ""
                      }`}
                    >
                      სხვა ციტატები წყაროდან
                    </div> */}
                  </button>
                </div>
              </div>
              <div className="card_copy">
                <CopyButton
                  text={`„${data.attributes.quote}“ 
- ${data.attributes.author}`}
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

export default TopicResult;
