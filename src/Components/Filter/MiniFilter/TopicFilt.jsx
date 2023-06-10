import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopicFilt = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((db) => {
        // async function logJSONData() {
        //   const response = await fetch(url);
        //   const jsonData = await response.json();
        //   console.log(jsonData.data);
        // }
        // logJSONData();

        const topics = db.data.map((topic) => topic.attributes.topic);

        for (let i = 0; i < topics.length; i++) {
          if (Array.isArray(topics[i])) {
            for (let j = 0; j < topics[i].length; j++) {
              allTopics.push(topics[i][j]);
            }
          } else {
            allTopics.push(topics[i]);
          }
        }
        // console.log(allTopics);

        // ~ sort author names in georgian alphabet
        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });
        allTopics.sort((a, b) => georgianCollator.compare(a, b));

        // ~ push unique authors to authorsList array
        const uniqueTopics = Array.from(new Set(allTopics));
        setAllTopics(uniqueTopics);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  // console.log(allTopics);

  function handleTopicClick(topicName) {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const filteredQuotes = db.data.filter(
          (topic) => topic.attributes.topic === topicName
        );
        // console.log(filteredQuotes);
        setFilteredQuotes(filteredQuotes);
        setSelectedTopic(topicName);
        navigate("/filtered", {
          state: { filteredQuotes },
        });
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  }

  // ~ group authors by first letter
  const sortedFirstLetters = [
    ...new Set(allTopics.map((topic) => topic.toString().charAt(0))),
  ].sort();

  return (
    <div className="topic_filter ">
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
                    <button key={topic} onClick={() => handleTopicClick(topic)}>
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
    </div>
  );
};

export default TopicFilt;
