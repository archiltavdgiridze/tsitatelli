import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../ReComp/CopyButton";
import axios from "axios";
import { API_ENDPOINT } from "../../quoteURL";
import { Skeleton } from "@mui/material";
import SearchBar from "../ReComp/SearchBar";
import "./search.css";

const Search = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quotes, setQuotes] = useState([]);
  // const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // const filtered = quotes.filter((quote) =>
    //   quote.toLowerCase().includes(query.toLowerCase())
    // );
    // setFilteredQuotes(filtered);
    // setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_ENDPOINT);
        const allQuotes = response.data.data;

        const filteredQuotes = allQuotes.filter((data) =>
          data.attributes.quote
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );

        setQuotes(filteredQuotes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (searchQuery !== "") {
      fetchQuotes();
    } else {
      setQuotes([]);
    }
  }, [searchQuery]);

  const handleCardClick = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/[-\s]/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleSourceClick = (sourceName) => {
    const decodedSourceName = encodeURIComponent(
      sourceName.replace(/[-\s]/g, "_")
    );
    navigate(`/source-results/${decodedSourceName}`);
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

  const highlightText = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  useEffect(() => {
    document.title = "ძიება | ციტატელი";
  }, []);

  return (
    <div className={`result rightDiv ${darkMode ? "dark-mode" : ""}`}>
      <div className={`search_wrapper ${darkMode ? "dark-mode" : ""}`}>
        <div className="search_input">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="მოძებნეთ სასურველი ციტატა"
          />

          {showNotFoundMessage && (
            <p className="not_found_msg">ციტატა ვერ მოიძებნა, სცადეთ სხვა.</p>
          )}
        </div>
        <div className="search_results">
          {loading ? (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </>
          ) : (
            <div className="cards">
              {quotes.map((data, index) => (
                <figure key={data.id} className="quote_card">
                  <div
                    className={`info_btn ${
                      activeCardIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleCardClick(index)}
                  >
                    <FontAwesomeIcon
                      className="quote_info"
                      icon={faCircleInfo}
                    />
                  </div>
                  <figcaption className="q_card_top search_q_card_top">
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      className="search_quote_icon"
                    />
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          data.attributes.quote,
                          searchQuery
                        ),
                      }}
                    ></h3>
                    <h3>– {data.attributes.author}</h3>
                  </figcaption>
                  <figcaption
                    className={`q_card_bottom ${
                      activeCardIndex === index ? "active" : ""
                    }`}
                    style={{
                      display: activeCardIndex === index ? "flex" : "none",
                    }}
                  >
                    <div className="q_card_buttons">
                      <div className="top_group_buttons">
                        <p className="group_title">წყარო:</p>
                        <button
                          className="linker_source linkers"
                          onClick={() =>
                            handleSourceClick(data.attributes.source)
                          }
                        >
                          <p>{data.attributes.source}</p>
                        </button>
                      </div>
                      <div className="bottom_group_buttons">
                        <p className="group_title">თემატიკა:</p>
                        <div className="topic_buttons">
                          {splitTopics(data.attributes.topic).map(
                            (topic, topicIndex) => (
                              <button
                                key={`${data.id}_${topicIndex}`}
                                className="linker_topic linkers"
                                onClick={() => handleTopicClick(topic)}
                              >
                                <p>{topic}</p>
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card_copy">
                      <CopyButton
                        text={`„${data.attributes.quote}“ 
- ${data.attributes.author}`}
                        className="copy-btn btn_filled "
                      />
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;
