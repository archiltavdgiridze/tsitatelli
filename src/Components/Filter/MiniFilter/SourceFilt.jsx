import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../ReComp/Search";

const SourceFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [sources, setSources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSources, setFilteredSources] = useState([]);

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
    navigate(
      `/source-results/${encodeURIComponent(
        sourceName.replace(/\s+|-|–/g, "-")
      )}`
    );
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = sources.filter((source) =>
      source.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSources(filtered);
  };

  const sortedFirstLetters = [
    ...new Set(sources.map((source) => source.charAt(0))),
  ].sort();

  return (
    <div className="source_filter">
      <div className="filter_container">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="ძიება წყაროს მიხედვით..."
        />

        {sortedFirstLetters.map((letter) => {
          const sourcesWithLetter = filteredSources.filter(
            (source) => source.charAt(0) === letter
          );
          if (sourcesWithLetter.length > 0) {
            return (
              <div key={letter} className="filt_cont_div">
                <h2>{letter}</h2>
                <div className="filt_cont_btn">
                  {sourcesWithLetter.map((source) => (
                    <button
                      key={source}
                      onClick={() => handleSourceClick(source)}
                    >
                      {source}
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

export default SourceFilt;
