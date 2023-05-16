import React, { useState } from "react";
import quoteBase from "../../quoteBase.json";

const FilterByAuthors = () => {
  // ~ georgianCollator is used to sort author names in georgian alphabet
  const georgianCollator = new Intl.Collator("ka-GE", {
    sensitivity: "base",
    ignorePunctuation: true,
  });

  quoteBase.sort((a, b) =>
    georgianCollator.compare(a.nameSurname, b.nameSurname)
  );

  // ~ this code creates a set of unique first letters of author names
  const firstLetters = new Set();

  for (let i = 0; i < quoteBase.length; i++) {
    const firstLetter = quoteBase[i].nameSurname.charAt(0);
    firstLetters.add(firstLetter);
  }
  const sortedFirstLetters = [...firstLetters].sort();

  // ~ this code pushes unique authors to authorsList array
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  let authorsList = [];
  for (let i = 0; i < quoteBase.length; i++) {
    if (!authorsList.includes(quoteBase[i].nameSurname)) {
      authorsList.push(quoteBase[i].nameSurname);
    }
  }

  // ~ this function filters quotes by author name
  function handleAuthorClick(authorName) {
    const filteredQuotes = quoteBase.filter(
      (quote) => quote.nameSurname === authorName
    );
    setFilteredQuotes(filteredQuotes);
    setSelectedAuthor(authorName);
    console.log(filteredQuotes);
  }

  return (
    <div className="result">
      <div className="FBA">
        <h1>ავტორები:</h1>
        {sortedFirstLetters.map((letter) => (
          <div key={letter} className="FBA_section">
            <h2>{letter}</h2>
            <div className="FBA_buttons">
              {authorsList.map((author) => {
                if (author.charAt(0) === letter) {
                  return (
                    <button
                      key={author}
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
        <div className="FBA_quotes">
          <h1>
            {selectedAuthor} – ციტატები <span>({filteredQuotes.length}) :</span>
          </h1>
          {filteredQuotes.map((quote) => (
            <div key={quote.id}>
              <h2>{quote.quote}</h2>
              {/* <p>{quote.source}</p> */}
              {/* <p>{quote.topic}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterByAuthors;
