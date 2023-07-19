import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faPenNib } from "@fortawesome/free-solid-svg-icons";
import CopyButton from "../../ReComp/CopyButton";
import Skeleton from "@mui/material/Skeleton";
import ShareButton from "../../ReComp/ShareButton";

const QuoteDisplay = ({ quote, author, isLoading, darkMode }) => {
  const handleShare = () => {
    // Ensure you have the publish_actions permission from Facebook for your app
    // Use the FB.api method to make a custom post request
    window.FB.api(
      "/me/feed",
      "post",
      {
        message: quote, // Use the quote as the post text
        link: window.location.href, // Add the website link to the post
      },
      (response) => {
        if (!response || response.error) {
          alert("Error sharing quote on Facebook. Please try again.");
        } else {
          alert("Quote shared on Facebook successfully!");
        }
      }
    );
  };

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
      <div className="share_n_author">
        <div className="share_fb">
          <ShareButton quote={quote} />
          
        </div>
        <div className="author">
          <FontAwesomeIcon icon={faPenNib} />
          <h3 className="generatedAuthor">{author}</h3>
        </div>
      </div>
    </>
  );
};

export default QuoteDisplay;
