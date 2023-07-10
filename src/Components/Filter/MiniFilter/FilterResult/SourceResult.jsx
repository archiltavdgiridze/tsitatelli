import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./result.css";
import CopyButton from "../../../ReComp/CopyButton";
import MailTo from "../../../AboutUs/MailTo";
import PaginationComponent from "../../../ReComp/Pagination";

const SourceResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sourceName, setSourceName] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(10);
  const [isScrolled, setIsScrolled] = useState(false);

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
      setFilteredQuotes(quotes);
    }
  }, [state]);

  useEffect(() => {
    document.title = `${sourceName} | ციტატელი`; // Update the tab name with the author's name
  }, [sourceName]);

  const fetchQuotesBySource = (sourceName) => {
    const apiUrl = `https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes?filter[source]=${sourceName}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredQuotes = data.data;
        setFilteredQuotes(filteredQuotes);
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

  // ~ Topic
  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/\s+|-/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleCardClick = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  const quoteCount = filteredQuotes.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(
    indexOfFirstQuote,
    indexOfLastQuote
  );
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > getYOffsetThreshold());
    };

    const getYOffsetThreshold = () => {
      return window.innerWidth >= 1024 ? 135 : 125; // Change the values as per your requirement
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`result filt_elem_result ${isScrolled ? "scrolled" : ""}`}>
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
                  {splitTopics(data.attributes.topic).map(
                    (topic, topicIndex) => (
                      <>
                        <button
                          key={`${data.id}_${topicIndex}`}
                          className="linker_topic linkers"
                          onClick={() => handleTopicClick(topic)}
                        >
                          <p>{topic}</p>
                        </button>
                      </>
                    )
                  )}
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
      {/* pagination */}
      {filteredQuotes.length > quotesPerPage && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SourceResult;
