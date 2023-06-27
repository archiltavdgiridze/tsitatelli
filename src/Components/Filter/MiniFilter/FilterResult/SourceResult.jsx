import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";

const SourceResult = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sourceName, setSourceName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const [hoveredAuthor, setHoveredAuthor] = useState(null);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const sourceFromURL = decodeURIComponent(
        window.location.pathname.split("/")[2]
      );
      const decodedSourceName = sourceFromURL.replace(/-/g, " ");
      fetchQuotesBySource(decodedSourceName);
    } else {
      // this code is executed when a user clicks on an source button
      const quotes = state.filteredQuotes;
      setSourceName(quotes[0]?.attributes.source || "");
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const fetchQuotesBySource = (sourceName) => {
    const decodedSourceName = sourceName.replace(/[-–]/g, " ");

    const apiUrl = `${url}?filter[source]=${encodeURIComponent(
      decodedSourceName
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        const formattedSourceName = decodedSourceName.replace(/–/g, " ");
        setSourceName(formattedSourceName);
        setFilteredQuotes(filteredQuotes);
      })

      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

  const handleGoBack = () => {
    navigate("/filter");
  };

  const handleAuthorClick = (authorName) => {
    const encodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/author-results/${encodedAuthorName}`);
  };

  const handleAuthorHover = (index) => {
    setHoveredIndex(index);
  };

  const handleAuthorHoverLeave = () => {
    setHoveredIndex(null);
  };

  const quoteCount = filteredQuotes.length;

  return (
    <div className="result filt_elem_result">
      <button className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {sourceName && (
        <h1 className="filtered_sourceName result_title ">
          {sourceName} | {quoteCount}
        </h1>
      )}

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
                    ავტორის სხვა ციტატები
                  </div>
                  <button
                    className="linker_source linkers"
                    onClick={() => handleAuthorClick(data.attributes.author)}
                    onMouseEnter={() => handleAuthorHover(index)}
                    onMouseLeave={handleAuthorHoverLeave}
                  >
                    <p>ავტორი: {data.attributes.author}</p>
                  </button>
                  {/* <button className="linker_topic">თემატიკა</button> */}
                </div>
                <div className="card_copy">
                  <CopyButton
                    text={`„${data.attributes.quote}“ - ${data.attributes.author}`}
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

export default SourceResult;
