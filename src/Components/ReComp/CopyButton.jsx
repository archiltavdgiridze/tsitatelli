import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const CopyButton = ({ text, className, style }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 4000); // Adjust the duration (in milliseconds) as needed
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return (
    <>
      <button
        onClick={handleCopy}
        // className="copy-btn"
        className={`${className}`}
        style={style}
      >
        <FontAwesomeIcon icon={faCopy} />
        <p className="copy-text">კოპირება</p>
      </button>
      {showMessage && (
        <div className="copy-message">
          <p>ციტატა დაკოპირდა.</p>
        </div>
      )}
    </>
  );
};

export default CopyButton;
