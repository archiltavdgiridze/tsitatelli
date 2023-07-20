import React from "react";
import SearchBar from "../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "../../Hooks/ForFilter/useMiniFilterHandlers";
import AlphabetScrollbar from "../../ReComp/AlphabetScrollbar";

const SourceFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredSources,
    handleSourceClick,
    handleSourceSearchChange,
  } = useMiniFilterHandlers();

  // Calculate sortedFirstLetters here
  const sortedFirstLetters = [
    ...new Set(
      filteredSources
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  const handleClick = (letter) => {
    // console.log("Clicked on letter:", letter);
    // Implement your logic here for scrolling to the corresponding section.
  };

  return (
    <div className="source_filter">
      <AlphabetScrollbar
        letters={sortedFirstLetters}
        handleClick={handleClick}
      />
      <SearchBar
        value={searchQuery}
        onChange={handleSourceSearchChange}
        placeholder="ძიება ავტორის მიხედვით..."
      />
      <div className="filter_container">
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
