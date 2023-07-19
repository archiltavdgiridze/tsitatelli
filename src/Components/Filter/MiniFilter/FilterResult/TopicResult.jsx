import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import PaginationComponent from "../../../ReComp/Pagination";
import useResultComponent from "./Hooks/useResultComponent";

const TopicResult = React.memo(({ darkMode }) => {
  const {
    resultName: topicName,
    handleGoBack,
    filteredQuotes,
    handleAuthorClick,
    handleSourceClick,
    handleCardClick,
    activeCardIndex,
    currentPage,
    handlePageChange,
    currentQuotes,
    totalPages,
    quoteCount,
    quotesPerPage,
    isScrolled,
  } = useResultComponent("topic");

  return (
    <div
      className={`result filt_elem_result ${isScrolled ? "scrolled" : ""} ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <div className={`topBar ${isScrolled ? "scrolled" : ""}`}>
        <button className="backButton" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {topicName && (
          <h1 className="filtered_topicName result_title ">
            {topicName} | {quoteCount}
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
              <h2>„{data.attributes.quote}“</h2>
            </figcaption>
            <figcaption
              className={`q_card_bottom ${
                activeCardIndex === index ? "active" : ""
              }`}
              style={{ display: activeCardIndex === index ? "flex" : "none" }}
            >
              <div className="q_card_buttons">
                <div className="top_group_buttons">
                  <p className="group_title">ავტორი:</p>
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleAuthorClick(data.attributes.author)}
                  >
                    <p>{data.attributes.author}</p>
                  </button>
                </div>
                <div className="bottom_group_buttons">
                  <p className="group_title">წყარო:</p>
                  <button
                    className="linker_topic linkers"
                    onClick={() => handleSourceClick(data.attributes.source)}
                  >
                    <p>{data.attributes.source}</p>
                  </button>
                </div>
              </div>
              <div className="card_copy">
                <CopyButton
                  text={`„${data.attributes.quote}“ 
- ${data.attributes.author}`}
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

export default TopicResult;
