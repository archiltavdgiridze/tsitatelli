import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../../ReComp/CopyButton";
import MailTo from "../../../AboutUs/MailTo";

const SourceResult = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sourceName, setSourceName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [hoveredAuthor, setHoveredAuthor] = useState(null);
  const [hoveredTopic, setHoveredTopic] = useState(null);

  useEffect(() => {
    if (!state?.filteredQuotes) {
      const sourceFromURL = decodeURIComponent(
        window.location.pathname.split("/")[2]
      );
      const decodedSourceName = sourceFromURL.replace(/_/g, " ");
      setSourceName(decodedSourceName);
      fetchQuotesBySource(decodedSourceName);
    } else {
      const quotes = state.filteredQuotes;
      // setSourceName(quotes[0]?.attributes.source || "");
      setFilteredQuotes(quotes);
    }
  }, [state]);

  const fetchQuotesBySource = (sourceName) => {
    // const decodedSourceName = sourceName.replace(/[-–]/g, " ");

    const apiUrl = `${url}?filter[source]=${sourceName}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        setFilteredQuotes(filteredQuotes);
        // const formattedSourceName = decodedSourceName.replace(/–/g, " ");
        // setSourceName(formattedSourceName);
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

  // ~ Author
  const handleAuthorClick = (authorName) => {
    const decodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/author-results/${decodedAuthorName}`);
  };

  const handleAuthorHover = (index) => {
    setHoveredAuthor(index);
  };

  const handleAuthorHoverLeave = () => {
    setHoveredAuthor(null);
  };

  // ~ Topic
  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/\s+|-/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleTopicHover = (index, topicIndex) => {
    setHoveredTopic({ quoteIndex: index, topicIndex });
  };

  const handleTopicHoverLeave = () => {
    setHoveredTopic(null);
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
      {sourceName === "უცნობი" && (
        // <div className="special-design">
        <p className="unknown_source_msg">
          *მოცემული ციტატების წყარო არის უცნობი. თუ რომელიმე ციტატის წყაროზე
          გაქვთ ინფორმაცია,
          <MailTo
            email="achitavdgiridze@gmail.com"
            subject="უცნობი წყაროს შესახებ"
            body="გამარჯობა, მსურს გაცნობოთ, რომ ციტატელის უცნობი წყაროს სექციაში არსებულ ერთ–ერთ ციტატაზე ვფლობ ინფორმაციას წყაროს შესახებ, იგი არის..."
          >
            დაგვიკავშირდით ელ-ფოსტაზე!
          </MailTo>
        </p>
        // </div>
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
                  <button
                    className="linker_source linkers"
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

export default SourceResult;
