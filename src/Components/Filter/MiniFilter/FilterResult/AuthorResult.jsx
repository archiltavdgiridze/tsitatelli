import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleInfo,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import CopyButton from "../../../ReComp/CopyButton";

const AuthorResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authorName, setAuthorName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [closeButtonActive, setCloseButtonActive] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [hoveredSource, setHoveredSource] = useState(null);

  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

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
    const apiUrl = `${url}?filter[author]=${authorName}`;
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

  const handleGoBack = () => {
    navigate("/filter");
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

  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/[-\s]/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleTopicHover = (index, topicIndex) => {
    setHoveredTopic({ quoteIndex: index, topicIndex });
  };

  const handleTopicHoverLeave = () => {
    setHoveredTopic(null);
  };

  const handleSourceClick = (sourceName) => {
    const decodedSourceName = encodeURIComponent(
      sourceName.replace(/[-\s]/g, "_")
    );
    navigate(`/source-results/${decodedSourceName}`);
  };

  const handleSourceHover = (index) => {
    setHoveredSource(index);
  };

  const handleSourceHoverLeave = () => {
    setHoveredSource(null);
  };

  // const handleCardClick = (index) => {
  //   setActiveCardIndex(index);
  // };

  // const handleCardBodyClick = () => {
  //   setActiveCardIndex(null);
  // };

  // const handleCardCloseClick = (event) => {
  //   event.stopPropagation(); // Prevent event bubbling to the card div
  //   setActiveCardIndex(null);
  // };

  const quoteCount = filteredQuotes.length;

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {authorName && (
        <h1 className="filtered_authorName result_title">
          {authorName} | {quoteCount}
        </h1>
      )}

      <div className="card">
        {filteredQuotes.map((data, index) => (
          <figure
            key={data.id}
            className={`quote_card ${
              activeCardIndex === index ? "active" : ""
            }`}
          >
            <div className="q_card_top">
              {/* <FontAwesomeIcon className="quote_info" icon={faCircleInfo} /> */}
              <h2>{data.attributes.quote}</h2>
            </div>
            <figcaption className="q_card_body">
              <div className="q_card_bottom">
                {/* <FontAwesomeIcon
                  className="close_icon"
                  icon={faX}
                  onClick={handleCardCloseClick}
                /> */}

                <div className="q_card_buttons">
                  <button
                    className="linker_source linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
                    onMouseEnter={() => handleSourceHover(index)}
                    onMouseLeave={handleSourceHoverLeave}
                  >
                    <p>წყარო: {data.attributes.source}</p>
                    {/* <div
                      className={`info_div ${
                        hoveredSource === index ? "active" : ""
                      }`}
                    >
                      სხვა ციტატები წყაროდან
                    </div> */}
                  </button>
                  {splitTopics(data.attributes.topic).map(
                    (topic, topicIndex) => (
                      <button
                        key={`${data.id}_${topicIndex}`}
                        className="linker_topic linkers"
                        onClick={() => handleTopicClick(topic)}
                        onMouseEnter={() => handleTopicHover(index, topicIndex)}
                        onMouseLeave={handleTopicHoverLeave}
                      >
                        <p>{topic}</p>
                        {/* <div
                          className={`info_div ${
                            hoveredTopic?.quoteIndex === index &&
                            hoveredTopic?.topicIndex === topicIndex
                              ? "active"
                              : ""
                          }`}
                        >
                          სხვა ციტატები თემიდან
                        </div> */}
                      </button>
                    )
                  )}
                </div>
                <div className="card_copy">
                  <CopyButton
                    text={`„${data.attributes.quote}“ 
- ${authorName}`}
                    className="copy-btn btn_filled"
                  />
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default AuthorResult;
