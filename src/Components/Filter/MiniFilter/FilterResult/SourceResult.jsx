import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";

const SourceResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sourceName, setSourceName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      navigate("/source-results/:source");
    } else {
      // this code is executed when a user clicks on an source button
      const quotes = state.filteredQuotes;
      setSourceName(quotes[0]?.attributes.source || "");
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const handleGoBack = () => {
    navigate("/filter");
  };

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {sourceName && <h1 className="filtered_sourceName">{sourceName}</h1>}

      <div className="filt_elem_result_quotes">
        {filteredQuotes.map((data) => (
          <div key={data.id} className="filtered_quote">
            <h2>{data.attributes.quote}</h2>
            <CopyButton
              text={`"${data.attributes.quote}" - ${sourceName}`}
              className="copy-btn"
            />
            {/* <p>{data.attributes.field_source}</p>
            <p>{data.attributes.field_topic}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceResult;
