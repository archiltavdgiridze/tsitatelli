import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthorFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  async function logJSONData() {
    let url =
      "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";
    const response = await fetch(url);
    const jsonData = await response.json();
    // console log all of the topics array together
    console.log(jsonData.data.map((topic) => topic.attributes.topic));
  }

  logJSONData();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const authorNames = db.data.map((author) => author.attributes.author);

        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        authorNames.sort((a, b) => georgianCollator.compare(a, b));

        const uniqueAuthorNames = Array.from(new Set(authorNames));
        setAuthors(uniqueAuthorNames);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  const handleAuthorClick = (authorName) => {
    navigate(
      `/author-results/${encodeURIComponent(
        authorName.replace(/\s+|-|–/g, "-")
      )}`
    );
  };

  const sortedFirstLetters = [
    ...new Set(authors.map((author) => author.charAt(0))),
  ].sort();

  return (
    <div className="author_filter">
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
