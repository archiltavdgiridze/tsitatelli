import React from "react";
import SearchBar from "../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "./MiniComps/useMiniFilterHandlers";

const AuthorFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredAuthors,
    handleAuthorClick,
    handleAuthorSearchChange,
  } = useMiniFilterHandlers();

  return (
    <div className="author_filter">
      <div className="filter_container">
        <SearchBar
          value={searchQuery}
          onChange={handleAuthorSearchChange}
          placeholder="ძიება ავტორის მიხედვით..."
        />
        {showNotFoundMessage && (
          <p className="not_found_msg">
            ავტორი ვერ მოიძებნა, სცადეთ სხვა სახელი.
          </p>
        )}
        <FilteredList
          filteredItems={filteredAuthors}
          handleItemClick={handleAuthorClick}
          dataStatus={isDataFetched}
        />
      </div>
    </div>
  );
};

export default AuthorFilt;
