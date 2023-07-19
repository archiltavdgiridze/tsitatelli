import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const CopyButton = ({ text, className, style }) => {
  const [buttonText, setButtonText] = useState("კოპირება");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setButtonText("დაკოპირდა ✓");
        setTimeout(() => {
          setButtonText("კოპირება");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return (
    <button onClick={handleCopy} className={`${className}`} style={style} alt="copy-quote-button">
      <FontAwesomeIcon icon={faCopy} className="copy_icon"/>
      <p className="copy-text">{buttonText}</p>
    </button>
  );
};

export default CopyButton;
