import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../quoteURL";
import Search from "./../../ReComp/Search";
import FilteredList from "../../ReComp/FilteredList";

const TopicFilt = () => {
  const url = API_ENDPOINT;
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
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
        setIsDataFetched(true);
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

  return (
    <div className="topic_filter ">
      <div className="filter_container">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="თემატიკის"
        />
        {showNotFoundMessage && (
          <p className="not_found_msg">თემატიკა ვერ მოიძებნა, სცადეთ სხვა.</p>
        )}
        <FilteredList
          filteredItems={filteredTopics}
          handleItemClick={handleTopicClick}
          dataStatus={isDataFetched}
        />
      </div>
    </div>
  );
};

export default TopicFilt;
