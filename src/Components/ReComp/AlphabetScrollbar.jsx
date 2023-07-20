import React from "react";
import "./RecompCSS/alphabetscrollbar.css";

const AlphabetScrollbar = ({ letters, handleClick }) => {
  return (
    <div className="alphabet_scrollbar">
      {letters.map((letter) => (
        <a key={letter} href={`#${letter}`} onClick={() => handleClick(letter)}>
          {letter}
        </a>
      ))}
    </div>
  );
};

export default AlphabetScrollbar;
