import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import PaginationComponent from "../../../ReComp/Pagination";
import useResultComponent from "../../../Hooks/ForFilter/useResultComponent";

const AuthorResult = React.memo(({ darkMode }) => {
  const {
    resultName: authorName,
    handleGoBack,
    filteredQuotes,
    handleTopicClick,
    handleSourceClick,
    handleCardClick,
    activeCardIndex,
    currentPage,
    splitTopics,
    handlePageChange,
    currentQuotes,
    totalPages,
    quoteCount,
    quotesPerPage,
    isScrolled,
  } = useResultComponent("author");

  return (
    <div
      className={`result filt_elem_result ${isScrolled ? "scrolled" : ""} ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      {/* <Helmet>
        <title>{`${authorName} |`} ციტატელი </title>
        <meta
          name="description"
          content={`${authorName} ციტატები`}
        />
      </Helmet> */}

      <div className={`topBar ${isScrolled ? "scrolled" : ""}`}>
        <button className="backButton" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {authorName && (
          <h1 className="filtered_authorName result_title">
            {authorName} | {quoteCount}
          </h1>
        )}
      </div>

      <div className="cards">
        {currentQuotes.map((data, index) => (
          <figure key={data.id} className="quote_card">
            <div
              className={`info_btn ${
                activeCardIndex === index ? "active" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <FontAwesomeIcon className="quote_info" icon={faCircleInfo} />
            </div>
            <figcaption className="q_card_top">
              <p>„{data.attributes.quote}“</p>
            </figcaption>
            <figcaption
              className={`q_card_bottom ${
                activeCardIndex === index ? "active" : ""
              }`}
              style={{ display: activeCardIndex === index ? "flex" : "none" }}
            >
              <div className="q_card_buttons">
                <div className="top_group_buttons">
                  <p className="group_title">წყარო:</p>
                  <button
                    className="linker_source linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
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
- ${authorName}`}
                  className="copy-btn btn_filled"
                />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {filteredQuotes.length > quotesPerPage && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
});

export default AuthorResult;
