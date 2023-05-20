import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Filtered = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    if (!state?.filteredQuotes) {
      navigate("/filter_by_authors");
    } else {
      setAuthorName(state.filteredQuotes[0]?.nameSurname || "");
    }
  }, [state]);

  const handleGoBack = () => {
    navigate("/filter_by_authors");
  };

  return (
    <div className="result FBA_filtered">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {authorName && <h1 className="filtered_authorName">{authorName}</h1>}

      <div className="FBA_filtered_quotes">
        {state?.filteredQuotes &&
          state.filteredQuotes.map((quote) => (
            <div key={quote.id}>
              <h2>{quote.quote}</h2>
              {/* <p>{quote.source}</p>
              <p>{quote.topic}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filtered;
