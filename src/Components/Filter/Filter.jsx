import React, { useState, useEffect } from "react";
import AuthorFilt from "./MiniFilter/AuthorFilt";
import TopicFilt from "./MiniFilter/TopicFilt";
import SourceFilt from "./MiniFilter/SourceFilt";

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState(
    sessionStorage.getItem("activeFilter") || "Authors"
  ); // Get the active filter from sessionStorage, default to "Authors" if not set

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
    sessionStorage.setItem("activeFilter", filterName); // Store the active filter in sessionStorage
  };

  const renderMiniFilter = () => {
    switch (activeFilter) {
      case "Topics":
        return <TopicFilt />;
      case "Sources":
        return <SourceFilt />;
      default:
        return <AuthorFilt />;
    }
  };

  return (
    <div className="result">
      <div className="result_wrapper">
        <div className="filter_buttons">
          <button
            className={activeFilter === "Authors" ? "active" : ""}
            onClick={() => handleFilterClick("Authors")}
          >
            ავტორები
          </button>
          <button
            className={activeFilter === "Topics" ? "active" : ""}
            onClick={() => handleFilterClick("Topics")}
          >
            თემატიკა
          </button>
          <button
            className={activeFilter === "Sources" ? "active" : ""}
            onClick={() => handleFilterClick("Sources")}
          >
            წყაროები
          </button>
        </div>
        <div className="filter_result">{renderMiniFilter()}</div>
      </div>
    </div>
  );
};

export default Filter;
