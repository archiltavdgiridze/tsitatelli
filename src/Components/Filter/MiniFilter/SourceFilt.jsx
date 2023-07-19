import React from "react";
import SearchBar from "../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "./Hooks/useMiniFilterHandlers";

const SourceFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredSources,
    handleSourceClick,
    handleSourceSearchChange,
  } = useMiniFilterHandlers();

  return (
    <div className="source_filter">
      <div className="filter_container">
        <SearchBar
          value={searchQuery}
          onChange={handleSourceSearchChange}
          placeholder="ძიება წყაროს მიხედვით..."
        />
        {showNotFoundMessage && (
          <p className="not_found_msg">
            წყარო ვერ მოიძებნა, სცადეთ სხვა სათაური.
          </p>
        )}
        <FilteredList
          filteredItems={filteredSources}
          handleItemClick={handleSourceClick}
          dataStatus={isDataFetched}
        />
      </div>
    </div>
  );
};

export default SourceFilt;
