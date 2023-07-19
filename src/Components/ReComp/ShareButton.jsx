import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const ShareButton = ({ quote }) => {
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

  return (
    <button onClick={handleShare}>
      <FontAwesomeIcon icon={faFacebookF} className="fb_icon"/>
      <p className="fb_text">დააკოპირე ციტატა და გააზიარე Facebook-ზე</p>
    </button>
  );
};

export default ShareButton;
