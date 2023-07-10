import React, { useEffect, useState } from "react";
import "./generator.css";
import CopyButton from "../ReComp/CopyButton";
import MultipleSelectChip from "../ReComp/ChipSelector";
import { API_ENDPOINT } from "../../quoteURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Generator = () => {
  const url = API_ENDPOINT;
  const navigate = useNavigate();

  const [authorNames, setAuthorNames] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [topicNames, setTopicNames] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [sourceNames, setSourceNames] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [generatedQuotes, setGeneratedQuotes] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const authorNames = db.data.map((author) => author.attributes.author);
        const topicNames = db.data.flatMap((topic) => topic.attributes.topic);
        const sourceNames = db.data.map((source) => source.attributes.source);

        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        authorNames.sort((a, b) => georgianCollator.compare(a, b));
        topicNames.sort((a, b) => georgianCollator.compare(a, b));
        sourceNames.sort((a, b) => georgianCollator.compare(a, b));

        const uniqueAuthorNames = Array.from(new Set(authorNames));
        const uniqueTopicNames = Array.from(new Set(topicNames));
        const uniqueSourceNames = Array.from(new Set(sourceNames));

        setAuthorNames(uniqueAuthorNames);
        setTopicNames(uniqueTopicNames);
        setSourceNames(uniqueSourceNames);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  }, []);

  const handleAuthorChange = (selected) => {
    setSelectedAuthors(selected);
  };

  const handleTopicChange = (selected) => {
    setSelectedTopics(selected);
  };

  const handleSourceChange = (selected) => {
    setSelectedSources(selected);
  };

  const generateQuotes = () => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching filtered quotes");
        }
      })
      .then((data) => {
        const quotes = data.data.map((quote) => quote.attributes);

        const filteredQuotes = applyFilters(quotes);
        const groupedQuotes = groupQuotesByCategory(filteredQuotes);
        setGeneratedQuotes(groupedQuotes);
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  };

  const applyFilters = (quotes) => {
    let filteredQuotes = [...quotes];
    const filteredByAuthor = [];
    const filteredByTopic = [];
    const filteredBySource = [];

    selectedAuthors.forEach((author) => {
      const quotesByAuthor = filteredQuotes.filter(
        (quote) => quote.author === author
      );
      filteredByAuthor.push(...quotesByAuthor);
    });

    selectedTopics.forEach((topic) => {
      const quotesByTopic = filteredQuotes.filter((quote) =>
        quote.topic.includes(topic)
      );
      filteredByTopic.push(...quotesByTopic);
    });

    selectedSources.forEach((source) => {
      const quotesBySource = filteredQuotes.filter(
        (quote) => quote.source === source
      );
      filteredBySource.push(...quotesBySource);
    });

    return [...filteredByAuthor, ...filteredByTopic, ...filteredBySource];
  };

  const groupQuotesByCategory = (quotes) => {
    const groupedQuotes = {};

    selectedAuthors.forEach((author) => {
      const quotesByAuthor = quotes.filter((quote) => quote.author === author);
      groupedQuotes[author] = groupedQuotes[author] || [];
      groupedQuotes[author].push(...quotesByAuthor);
    });

    selectedTopics.forEach((topic) => {
      const quotesByTopic = quotes.filter((quote) =>
        quote.topic.includes(topic)
      );
      groupedQuotes[topic] = groupedQuotes[topic] || [];
      groupedQuotes[topic].push(...quotesByTopic);
    });

    selectedSources.forEach((source) => {
      const quotesBySource = quotes.filter((quote) => quote.source === source);
      groupedQuotes[source] = groupedQuotes[source] || [];
      groupedQuotes[source].push(...quotesBySource);
    });

    return groupedQuotes;
  };

  const splitTopics = (topics) => {
    if (typeof topics === "string") {
      return topics.split(",");
    } else if (Array.isArray(topics)) {
      return topics.join(",").split(",");
    } else {
      return [];
    }
  };

  const handleTopicClick = (topicName) => {
    const decodedTopicName = encodeURIComponent(
      topicName.replace(/[-\s]/g, "_")
    );
    navigate(`/topic-results/${decodedTopicName}`);
  };

  const handleSourceClick = (sourceName) => {
    const decodedSourceName = encodeURIComponent(
      sourceName.replace(/[-\s]/g, "_")
    );
    navigate(`/source-results/${decodedSourceName}`);
  };

  const handleCardClick = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  return (
    <div className="result rightDiv">
      <div className="result_wrapper rightDivWrapper">
        <h3 style={{ color: "red" }}>
          *კომპონენტი არის დეველოპმენტის პროცესში
        </h3>
        <div className="generator_title">
          <h1 className="result_title">ციტატების გენერატორი</h1>
        </div>
        <hr />
        <div className="generator_btns">
          <div className="selectors">
            <MultipleSelectChip
              title="ავტორი"
              names={authorNames}
              selectedNames={selectedAuthors}
              onChange={handleAuthorChange}
            />
            <MultipleSelectChip
              title="თემატიკა"
              names={topicNames}
              selectedNames={selectedTopics}
              onChange={handleTopicChange}
            />
            <MultipleSelectChip
              title="წყარო"
              names={sourceNames}
              selectedNames={selectedSources}
              onChange={handleSourceChange}
            />
          </div>
          <div className="generatorBtn">
            <button onClick={() => generateQuotes()}>გენერირება</button>
          </div>
        </div>
        <hr />
        <div className="card_groups">
          {Object.entries(generatedQuotes).map(([category, quotes]) => (
            <div className="card_group">
              <h2 className="gen_category_title">{category}</h2>
              <div key={category} className="cards gen_cards">
                {quotes.map((data, index) => (
                  <div key={index} className="quote_card gen_quote_card">
                    <div
                      className={`info_btn ${
                        activeCardIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleCardClick(index)}
                    >
                      <FontAwesomeIcon
                        className="quote_info"
                        icon={faCircleInfo}
                      />
                    </div>
                    <figcaption className="q_card_top">
                      <h2>„{data.quote}“</h2>
                    </figcaption>
                    <figcaption
                      className={`q_card_bottom ${
                        activeCardIndex === index ? "active" : ""
                      }`}
                      style={{
                        display: activeCardIndex === index ? "flex" : "none",
                      }}
                    >
                      <div className="q_card_buttons">
                        <div className="top_group_buttons">
                          <p className="group_title">წყარო:</p>
                          <button
                            className="linker_source linkers"
                            onClick={() => handleSourceClick(data.source)}
                          >
                            <p>{data.source}</p>
                          </button>
                        </div>
                        <div className="bottom_group_buttons">
                          <p className="group_title">თემატიკა:</p>
                          {splitTopics(data.topic).map((topic, topicIndex) => (
                            <button
                              key={`${data.id}_${topicIndex}`}
                              className="linker_topic linkers"
                              onClick={() => handleTopicClick(topic)}
                            >
                              <p>{topic}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="card_copy">
                        <CopyButton
                          text={`„${data.quote}“ 
- ${data.author}`}
                          className="copy-btn btn_filled"
                        />
                      </div>
                    </figcaption>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generator;
