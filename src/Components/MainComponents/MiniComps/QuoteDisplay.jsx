import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../ReComp/CopyButton";
import Skeleton from "@mui/material/Skeleton";

const QuoteDisplay = ({ quote, author, isLoading, darkMode }) => {
  if (isLoading) {
    return (
      <>
        <div className={`quote ${darkMode ? "dark-mode" : ""}`}>
          <FontAwesomeIcon icon={faQuoteLeft} />
          <div className="MP_textNcopy">
            <Skeleton
              animation="wave"
              variant="text"
              width="95%"
              height="30px"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="78%"
              height="30px"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="85%"
              height="30px"
            />
            <CopyButton
              className="copy-btn"
              text={`„${quote}“ 
- ${author}`}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="author"
        >
          <FontAwesomeIcon icon={faPenNib} />
          <Skeleton variant="text" width="40%" height="30px" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`quote hyphenate-wrap ${darkMode ? "dark-mode" : ""}`}>
        <FontAwesomeIcon icon={faQuoteLeft} />
        <div className="MP_textNcopy">
          <h3 className="generatedQuote">{quote}</h3>
          <CopyButton
            className="copy-btn"
            text={`„${quote}“ 
- ${author}`}
          />
        </div>
      </div>
      <div className="author">
        <FontAwesomeIcon icon={faPenNib} />
        <h3 className="generatedAuthor">{author}</h3>
      </div>
    </>
  );
};

export default QuoteDisplay;
