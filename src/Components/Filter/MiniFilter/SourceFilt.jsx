import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SourceFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        // console.log(db.data);

        async function logJSONData() {
          const response = await fetch(url);
          const jsonData = await response.json();
          // console.log(jsonData.data);
        }
        logJSONData();

        const sourceNames = db.data.map((source) => source.attributes.source);
        // console.log(sourceNames);

        // ~ sort source names in Georgian alphabet
        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        sourceNames.sort((a, b) => georgianCollator.compare(a, b));

        // ~ push unique sources to sourcesList array

        const uniqueSourceNames = Array.from(new Set(sourceNames));
        setSources(uniqueSourceNames);
      })
      .catch((error) => {
        console.error("Error fetching source data:", error);
      });
  }, []); // Add an empty dependency array to execute the effect only once

  function handleSourceClick(sourceName) {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const filteredQuotes = db.data.filter(
          (source) => source.attributes.source === sourceName
        );
        console.log(filteredQuotes);
        setFilteredQuotes(filteredQuotes);
        setSelectedSource(sourceName);
        navigate("/source-results/:source", {
          state: { filteredQuotes },
        });
      })
      .catch((error) => {
        console.error("Error fetching source data:", error);
      });
  }

  // ~ group authors by first letter
  const sortedFirstLetters = [
    ...new Set(sources.map((source) => source.charAt(0))),
  ].sort();

  return (
    <div className="source_filter">
      <div className="filter_container">
        {sortedFirstLetters.map((letter) => {
          const sourcesWithLetter = sources.filter(
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
