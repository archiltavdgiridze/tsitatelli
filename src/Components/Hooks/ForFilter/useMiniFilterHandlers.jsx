import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_ENDPOINT from "../../../quoteURL";

const useMiniFilterHandlers = () => {
  // const url = API_ENDPOINT;
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);

  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [filteredSources, setFilteredSources] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    try {
      const db = API_ENDPOINT; // use the imported JSON data

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
      const uniqueTopics = Array.from(new Set(topicNames));
      const uniqueSourceNames = Array.from(new Set(sourceNames));

      setAuthors(uniqueAuthorNames);
      setTopics(uniqueTopics);
      setSources(uniqueSourceNames);

      setFilteredAuthors(uniqueAuthorNames);
      setFilteredTopics(uniqueTopics);
      setFilteredSources(uniqueSourceNames);

      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  }, []);

  const handleAuthorClick = (authorName) => {
    const encodedAuthorName = encodeURIComponent(
      authorName.replace(/\s+|-/g, "_")
    );
    navigate(`/filter/author-results/${encodedAuthorName}`);
  };

  const handleTopicClick = (topicName) => {
    const encodedTopicName = encodeURIComponent(
      topicName.replace(/\s+|-/g, "_")
    );
    navigate(`/filter/topic-results/${encodedTopicName}`);
  };

  const handleSourceClick = (sourceName) => {
    const encodedAuthorName = encodeURIComponent(
      sourceName.replace(/\s+|-/g, "_")
    );
    navigate(`/filter/source-results/${encodedAuthorName}`);
  };

  const handleAuthorSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = authors.filter((author) =>
      author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  const handleTopicSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = topics.filter((source) =>
      source.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  const handleSourceSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = sources.filter((source) =>
      source.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSources(filtered);
    setShowNotFoundMessage(filtered.length === 0 && query !== "");
  };

  return {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredAuthors,
    filteredTopics,
    filteredSources,
    handleAuthorClick,
    handleTopicClick,
    handleSourceClick,
    handleAuthorSearchChange,
    handleTopicSearchChange,
    handleSourceSearchChange,
  };
};

export default useMiniFilterHandlers;
