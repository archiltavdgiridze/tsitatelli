import React from "react";
import { Link } from "react-router-dom";
import "./errorcomp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons";

const ErrorComp = ({ darkMode }) => {
  return (
    <div className={`result error_page ${darkMode ? "dark-mode" : ""}`}>
      <FontAwesomeIcon icon={faLinkSlash} className="link_slash_icon" />
      <h1 className="not_found_txt">გვერდი ვერ მოიძებნა</h1>
      <Link to="/" className="back_to_main_btn">
        <h2>დაბრუნდი მთავარ გვერდზე</h2>
      </Link>
    </div>
  );
};

export default ErrorComp;
