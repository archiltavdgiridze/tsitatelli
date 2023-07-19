import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../quoteURL";
import SearchBar from "./../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "./MiniComps/useMiniFilterHandlers";

const TopicFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredTopics,
    handleTopicClick,
    handleTopicSearchChange,
  } = useMiniFilterHandlers();

  return (
    <div className="topic_filter ">
      <div className="filter_container">
        <SearchBar
          value={searchQuery}
          onChange={handleTopicSearchChange}
          placeholder="ძიება თემატიკის მიხედვით..."
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
