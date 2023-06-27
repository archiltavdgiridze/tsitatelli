import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../ReComp/Search";
// import "./minifilter.css"

const AuthorFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  const navigate = useNavigate();

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
        setFilteredAuthors(uniqueAuthorNames);
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

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = authors.filter((author) =>
      author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  const sortedFirstLetters = [
    ...new Set(filteredAuthors.map((author) => author.charAt(0))),
  ].sort();

  return (
    <div className="author_filter">
      <div className="filter_container">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="ძიება ავტორის მიხედვით..."
        />
        <div>
          {showNotFoundMessage && (
            <p className="not_found_msg">ავტორი ვერ მოიძებნა, სცადეთ სხვა სახელი.</p>
          )}
        </div>

        {sortedFirstLetters.map((letter) => {
          const authorsWithLetter = filteredAuthors.filter(
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
