import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../ReComp/Search";
import { API_ENDPOINT } from "../../../quoteURL";
import FilteredList from "../../ReComp/FilteredList";

const SourceFilt = () => {
  const url = API_ENDPOINT;
  const [sources, setSources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSources, setFilteredSources] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const sourceNames = db.data.map((source) => source.attributes.source);

        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        sourceNames.sort((a, b) => georgianCollator.compare(a, b));

        const uniqueSourceNames = Array.from(new Set(sourceNames));
        setSources(uniqueSourceNames);
        setFilteredSources(uniqueSourceNames);
      })
      .catch((error) => {
        console.error("Error fetching source data:", error);
      });
  }, []);

  const handleSourceClick = (sourceName) => {
    const encodedAuthorName = encodeURIComponent(
      sourceName.replace(/\s+|-/g, "_")
    );
    navigate(`/source-results/${encodedAuthorName}`);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = sources.filter((source) =>
      source.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSources(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  // const sortedFirstLetters = [
  //   ...new Set(sources.map((source) => source.charAt(0))),
  // ].sort();

  return (
    <div className="source_filter">
      <div className="filter_container">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="წყაროს"
        />
        {showNotFoundMessage && (
          <p className="not_found_msg">
            წყარო ვერ მოიძებნა, სცადეთ სხვა სათაური.
          </p>
        )}
        <FilteredList
          filteredItems={filteredSources}
          handleItemClick={handleSourceClick}
        />
      </div>
    </div>
  );
};

export default SourceFilt;
