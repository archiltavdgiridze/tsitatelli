import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../ReComp/CopyButton";

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
          state.filteredQuotes.map((data) => (
            <div key={data.id} className="filtered_quote">
              <h2>{data.quote}</h2>
              <CopyButton
                text={`"${data.quote}" - ${authorName}"`}
                className="copy-btn"
                style={{}}
              />
              {/* <p>{data.source}</p>
              <p>{data.topic}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filtered;
