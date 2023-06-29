import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../quoteURL";
import Search from "./../../ReComp/Search";

const TopicFilt = () => {
  const url = API_ENDPOINT;
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        // ~
        const topicNames = db.data.flatMap((topic) => topic.attributes.topic);
        console.log(topics);

        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        topicNames.sort((a, b) => georgianCollator.compare(a, b));

        const uniqueTopics = Array.from(new Set(topicNames));
        setTopics(uniqueTopics);
        setFilteredTopics(uniqueTopics);
      })
      .catch((error) => {
        console.error("Error fetching topic data:", error);
      });
  }, []);

  const handleTopicClick = (topicName) => {
    const encodedTopicName = encodeURIComponent(
      topicName.replace(/\s+|-/g, "_")
    );
    navigate(`/topic-results/${encodedTopicName}`);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = topics.filter((source) =>
      source.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  const sortedFirstLetters = [
    ...new Set(topics.map((topic) => topic.charAt(0))),
  ].sort();

  return (
    <div className="topic_filter ">
      {isRendered ? (
        <div className="filter_container">
          <Search
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ძიება წყაროს მიხედვით..."
          />
          {showNotFoundMessage && (
            <p className="not_found_msg">
              თემატიკა ვერ მოიძებნა, სცადეთ სხვა.
            </p>
          )}
          {sortedFirstLetters.map((letter) => {
            const topicsByLetter = filteredTopics.filter(
              (topic) => topic.charAt(0) === letter
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
