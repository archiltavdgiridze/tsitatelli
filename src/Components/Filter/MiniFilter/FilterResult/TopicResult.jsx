import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";
// import MailTo from "../../../AboutUs/MailTo";

const TopicResult = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [topicName, setTopicName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [hoveredAuthor, setHoveredAuthor] = useState(null);
  const [hoveredSource, setHoveredSource] = useState(null);

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

    const apiUrl = `${url}?filter[topic]=${encodeURIComponent(
      decodedTopicName
    )}`;

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

  const handleAuthorHover = (index) => {
    setHoveredAuthor(index);
  };

  const handleAuthorHoverLeave = () => {
    setHoveredAuthor(null);
  };

  // ~ Source
  const handleSourceClick = (sourceName) => {
    const encodedSourceName = encodeURIComponent(
      sourceName.replace(/\s+|-/g, "_")
    );
    navigate(`/source-results/${encodedSourceName}`);
  };

  const handleSourceHover = (index) => {
    setHoveredSource(index);
  };

  const handleSourceHoverLeave = () => {
    setHoveredSource(null);
  };

  const quoteCount = filteredQuotes.length;

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
      {/* Add your custom message or styling for unknown topics here */}
      <div className="card">
        {filteredQuotes.map((data, index) => (
          <figure key={data.id} className="quote_card">
            <div className="q_card_top">
              <h2>{data.attributes.quote}</h2>
            </div>

            <figcaption className="q_card_body">
              <div className="q_card_bottom">
                <div className="q_card_buttons">
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleAuthorClick(data.attributes.author)}
                    onMouseEnter={() => handleAuthorHover(index)}
                    onMouseLeave={handleAuthorHoverLeave}
                  >
                    <p>ავტორი: {data.attributes.author}</p>
                    {/* <div
                      className={`info_div ${
                        hoveredAuthor === index ? "active" : ""
                      }`}
                    >
                      ავტორის სხვა ციტატები
                    </div> */}
                  </button>
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
                    onMouseEnter={() => handleSourceHover(index)}
                    onMouseLeave={handleSourceHoverLeave}
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
                <div className="card_copy">
                  <CopyButton
                    text={`„${data.attributes.quote}“ 
- ${data.attributes.author}`}
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

export default TopicResult;
