import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FacebookShareButton } from "react-share";
import "./RecompCSS/sharebutton.css"

const ShareButton = ({ quote }) => {
  const quoteURL = window.location.href;

  return (
    <FacebookShareButton quote={quote} url={quoteURL}>
      <button>
        <FontAwesomeIcon icon={faFacebookF} className="fb_icon" />
        <p className="fb_text">დააკოპირე ციტატა და გააზიარე Facebook-ზე</p>
      </button>
    </FacebookShareButton>
  );
};

export default ShareButton;
