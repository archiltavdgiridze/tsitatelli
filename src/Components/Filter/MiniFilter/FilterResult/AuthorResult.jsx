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
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const authorFromURL = decodeURIComponent(
        window.location.pathname.split("/")[2]
      );
      const decodedAuthorName = authorFromURL.replace(/-/g, " ");
      fetchQuotesByAuthor(decodedAuthorName);
    } else {
      const quotes = state.filteredQuotes;
      setAuthorName(quotes[0]?.attributes.author || "");
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const fetchQuotesByAuthor = (authorName) => {
    const decodedAuthorName = authorName.replace(/[-–]/g, " ");

    const apiUrl = `${url}?filter[author]=${encodeURIComponent(
      decodedAuthorName
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        const formattedAuthorName = decodedAuthorName.replace(/–/g, " ");
        setAuthorName(formattedAuthorName);
        setFilteredQuotes(filteredQuotes);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

  const handleGoBack = () => {
    navigate("/filter");
  };

  const handleSourceClick = (sourceName) => {
    const decodedSourceName = sourceName.replace(/[-–\s]/g, "-");
    navigate(`/source-results/${encodeURIComponent(decodedSourceName)}`);
  };

  const handleSourceHover = (index) => {
    setHoveredIndex(index);
  };

  const handleSourceHoverLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {authorName && <h1 className="filtered_authorName">{authorName}</h1>}

      <div className="card">
        {filteredQuotes.map((data, index) => (
          <figure key={data.id} className="quote_card">
            <div className="q_card_top">
              <h2>{data.attributes.quote}</h2>
            </div>

            <figcaption className="q_card_body">
              <div className="q_card_bottom">
                <div className="q_card_buttons">
                  <div
                    className={`info_div ${
                      hoveredIndex === index ? "active" : ""
                    }`}
                  >
                    სხვა ციტატები წყაროდან
                  </div>
                  <button
                    className="linker_source"
                    onClick={() => handleSourceClick(data.attributes.source)}
                    onMouseEnter={() => handleSourceHover(index)}
                    onMouseLeave={handleSourceHoverLeave}
                  >
                    <p>წყარო: {data.attributes.source}</p>
                  </button>
                </div>
                <div className="card_copy">
                  <CopyButton
                    text={`„${data.attributes.quote}“ - ${authorName}`}
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
