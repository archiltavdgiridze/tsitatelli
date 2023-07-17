import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../ReComp/SearchBar";
import { API_ENDPOINT } from "../../../quoteURL";
import FilteredList from "../../ReComp/FilteredList";


const AuthorFilt = () => {
  const url = API_ENDPOINT;
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

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
        setIsDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  const handleAuthorClick = (authorName) => {
    const encodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/author-results/${encodedAuthorName}`);
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

  return (
    <div className="author_filter">
      <div className="filter_container">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="ძიება ავტორის მიხედვით..."
        />
        {showNotFoundMessage && (
          <p className="not_found_msg">
            ავტორი ვერ მოიძებნა, სცადეთ სხვა სახელი.
          </p>
        )}
        <FilteredList
          filteredItems={filteredAuthors}
          handleItemClick={handleAuthorClick}
          dataStatus={isDataFetched}
        />
      </div>
    </div>
  );
};

export default AuthorFilt;
