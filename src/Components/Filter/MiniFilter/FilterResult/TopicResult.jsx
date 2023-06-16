import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";

const TopicResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [topicName, setTopicName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    if (!state || !state.filteredQuotes) {
      navigate("/topic-results/:topic");
    } else {
      const quotes = state.filteredQuotes;
      if (quotes.length > 0 && quotes[0]?.attributes?.topic) {
        setTopicName(quotes[0].attributes.topic);
        setFilteredQuotes(quotes);
      }
    }
  }, [state, navigate]);

  const handleGoBack = () => {
    navigate("/filter");
  };

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {topicName && <h1 className="filtered_topicName">{topicName}</h1>}

      <div className="filt_elem_result_quotes">
        {filteredQuotes.map((data) => (
          <div key={data.id} className="filtered_quote">
            <h2>{data.attributes?.quote}</h2>
            <CopyButton
              text={`„${data.attributes?.quote}“ - ${topicName}`}
              className="copy-btn"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicResult;
