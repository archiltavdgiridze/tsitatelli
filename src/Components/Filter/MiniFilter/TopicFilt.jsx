import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopicFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const topics = db.data.flatMap((quote) => quote.attributes.topic);

        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        const sortedTopics = topics.sort((a, b) =>
          georgianCollator.compare(a, b)
        );

        const uniqueTopics = Array.from(new Set(sortedTopics));
        setAllTopics(uniqueTopics);
      })
      .catch((error) => {
        console.error("Error fetching topic data:", error);
      });
  }, []);

  function handleTopicClick(topicName) {
    const filteredQuotes = allTopics.filter((topic) => topic === topicName);
    console.log(filteredQuotes);

    setFilteredQuotes(filteredQuotes);
    setSelectedTopic(topicName);
    navigate("/topic-results/:topic", {
      state: { filteredQuotes },
    });
  }

  const sortedFirstLetters = [
    ...new Set(allTopics.map((topic) => topic.toString().charAt(0))),
  ].sort();

  // useEffect(() => {
  //   if (allTopics.length > 0) {
  //     setIsRendered(true);
  //   }
  // }, [allTopics]);

  return (
    <div className="topic_filter ">
      {isRendered ? (
        <div className="filter_container">
          {sortedFirstLetters.map((letter) => {
            const topicsByLetter = allTopics.filter(
              (topic) => topic.toString().charAt(0) === letter
            );
            if (topicsByLetter.length > 0) {
              return (
                <div key={letter} className="filt_cont_div">
                  <h2>{letter}</h2>
                  <div className="filt_cont_btn">
                    {topicsByLetter.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicClick(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <h1 className="topic_placeholder">
          თემატიკის ფილტრი დაემატება ახლო მომავალში.
        </h1>
      )}
    </div>
  );
};

export default TopicFilt;
