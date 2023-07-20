import React from "react";
import SearchBar from "./../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "../../Hooks/ForFilter/useMiniFilterHandlers";
import AlphabetScrollbar from "../../ReComp/AlphabetScrollbar";


const TopicFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredTopics,
    handleTopicClick,
    handleTopicSearchChange,
  } = useMiniFilterHandlers();

  const sortedFirstLetters = [
    ...new Set(
      filteredTopics
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  const handleClick = (letter) => {
    // console.log("Clicked on letter:", letter);
    // Implement your logic here for scrolling to the corresponding section.
  };

  return (
    <div className="topic_filter ">
        <AlphabetScrollbar
          letters={sortedFirstLetters}
          handleClick={handleClick}
        />
        <SearchBar
          value={searchQuery}
          onChange={handleTopicSearchChange}
          placeholder="ძიება თემატიკის მიხედვით..."
        />
      <div className="filter_container">
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
