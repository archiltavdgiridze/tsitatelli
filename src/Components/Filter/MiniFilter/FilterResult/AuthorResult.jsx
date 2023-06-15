import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";

const AuthorResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authorName, setAuthorName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      navigate("/author-results/:author");
    } else {
      // this code is executed when a user clicks on an author button 
      const quotes = state.filteredQuotes;
      setAuthorName(quotes[0]?.attributes.author || "");
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
      {authorName && <h1 className="filtered_authorName">{authorName}</h1>}

      <div className="filt_elem_result_quotes">
        {filteredQuotes.map((data) => (
          <div key={data.id} className="filtered_quote">
            <h2>{data.attributes.quote}</h2>
            <CopyButton
              text={`"${data.attributes.quote}" - ${authorName}`}
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

export default AuthorResult;
