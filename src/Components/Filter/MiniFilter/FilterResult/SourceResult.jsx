import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import MailTo from "../../../AboutUs/MailTo";
import PaginationComponent from "../../../ReComp/Pagination";
import useResultComponent from "../../../Hooks/ForFilter/useResultComponent";

const SourceResult = React.memo(({ darkMode }) => {
  const {
    resultName: sourceName,
    handleGoBack,
    filteredQuotes,
    handleAuthorClick,
    handleTopicClick,
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
  } = useResultComponent("source");

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
        {sourceName && (
          <h1 className="filtered_sourceName result_title ">
            {sourceName} | {quoteCount}
          </h1>
        )}
      </div>
      {sourceName === "უცნობი" && (
        <p className="unknown_source_msg">
          *მოცემული ციტატების წყარო არის უცნობი. თუ რომელიმე ციტატის წყაროზე
          გაქვთ ინფორმაცია,
          <MailTo
            email="achitavdgiridze@gmail.com"
            subject="უცნობი წყაროს შესახებ"
            body="გამარჯობა, მსურს გაცნობოთ, რომ ციტატელის უცნობი წყაროს სექციაში არსებულ ერთ–ერთ ციტატაზე ვფლობ ინფორმაციას წყაროს შესახებ, იგი არის..."
          >
            დაგვიკავშირდით ელ-ფოსტაზე
          </MailTo>
          ❤
        </p>
      )}

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
                    className="linker_source linkers"
                    onClick={() => handleAuthorClick(data.attributes.author)}
                  >
                    <p>{data.attributes.author}</p>
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

export default SourceResult;
