import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthorFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        // console.log(db.data);

        const authorNames = db.data.map((author) => author.attributes.author);
        // console.log(authorNames);

        // ~ sort author names in georgian alphabet
        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        authorNames.sort((a, b) => georgianCollator.compare(a, b));

        // ~ push unique authors to authorsList array

        const uniqueAuthorNames = Array.from(new Set(authorNames));
        setAuthors(uniqueAuthorNames);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  function handleAuthorClick(authorName) {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const filteredQuotes = db.data.filter(
          (author) => author.attributes.author === authorName
        );
        // console.log(filteredQuotes);
        setFilteredQuotes(filteredQuotes);
        setSelectedAuthor(authorName);
        navigate("/author-results/:author", {
          state: { filteredQuotes },
        });
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  }

  // ~ group authors by first letter
  const sortedFirstLetters = [
    ...new Set(authors.map((author) => author.charAt(0))),
  ].sort();

  return (
    <div className="author_filter ">
      <div className="filter_container">
        {sortedFirstLetters.map((letter) => {
          const authorsWithLetter = authors.filter(
            (author) => author.charAt(0) === letter
          );
          if (authorsWithLetter.length > 0) {
            return (
              <div key={letter} className="filt_cont_div">
                <h2>{letter}</h2>
                <div className="filt_cont_btn">
                  {authorsWithLetter.map((author) => (
                    <button
                      key={author}
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default AuthorFilt;
