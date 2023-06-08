import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sources = () => {
const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [source, setSource] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [filteredSource, setFilteredSources] = useState("");

  useEffect(() => {
    fetch(
      "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian_quotes/books"
    )
      .then((response) => response.json())
      .then((db) => {
        const sources = db.data.map((name) => name.attributes.name);
        console.log(sources);

        // ~ sort author names in georgian alphabet
        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        sources.sort((a, b) => georgianCollator.compare(a, b));
        // ~ push unique authors to authorsList array

        const uniqueSources = Array.from(new Set(sources));
        setSource(uniqueSources);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian_quotes/books"
      );
      const sources = response.data.data;

      let randomIndex = generateRandomIndex(sources.length);

      setSource(source);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const generateRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  };

  fetchBooks();

  // function handleSourceClick(name) {
  //   fetch(
  //     "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian_quotes/books"
  //   )
  //     .then((response) => response.json())
  //     .then((db) => {
  //       const filteredSource = db.data.filter(
  //         (name) => name.attributes.name === name
  //       );
  //       console.log(filteredSource);
  //       setFilteredSources(filteredSource);
  //       setSelectedSource(name);
  //       navigate("/source", {
  //         state: { filteredSource },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching filtered Source:", error);
  //     });
  // }

  // ~ group authors by first letter
  const sortedFirstLetters = [
    ...new Set(source.map((name) => name.charAt(0))),
  ].sort();

  return (
    <div className="result">
      <h1>წყაროები</h1>
      <div className="sources">
        {sortedFirstLetters.map((letter) => {
          const sourcesWithLetter = source.filter(
            (name) => name.charAt(0) === letter
          );
          if (sourcesWithLetter.length > 0) {
            return (
              <div key={letter} className="sources_section">
                <h2>{letter}</h2>
                <div className="sources_buttons">
                  {sourcesWithLetter.map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* <h1>{source}</h1> */}
    </div>
  );
};

export default Sources;
