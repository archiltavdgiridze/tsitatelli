import React, { useState } from "react";
import AuthorFilt from "./MiniFilter/AuthorFilt";
import TopicFilt from "./MiniFilter/TopicFilt";
import SourceFilt from "./MiniFilter/SourceFilt";

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
  };

  const renderMiniFilter = () => {
    switch (activeFilter) {
      case "Authors":
        return <AuthorFilt />;
      case "Topics":
        return <TopicFilt />;
      case "Sources":
        return <SourceFilt />;
      default:
        return <h1 className="filter_placeholder">დააჭირე ღილაკს გასაფილტრად.</h1>;
    }
  };

  return (
    <div className="result">
      <div className="result_wrapper">
        <div className="filter_buttons">
          <button onClick={() => handleFilterClick("Authors")}>ავტორები</button>
          <button onClick={() => handleFilterClick("Topics")}>თემატიკა</button>
          <button onClick={() => handleFilterClick("Sources")}>წყაროები</button>
        </div>
        <div className="filter_result">{renderMiniFilter()}</div>
      </div>
    </div>
  );
};

export default Filter;
