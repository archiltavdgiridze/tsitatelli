import React from "react";
import SearchBar from "../../ReComp/SearchBar";
import FilteredList from "../../ReComp/FilteredList";
import useMiniFilterHandlers from "../../Hooks/ForFilter/useMiniFilterHandlers";
import AlphabetScrollbar from "../../ReComp/AlphabetScrollbar";

const AuthorFilt = () => {
  const {
    searchQuery,
    showNotFoundMessage,
    isDataFetched,
    filteredAuthors,
    handleAuthorClick,
    handleAuthorSearchChange,
  } = useMiniFilterHandlers();

  // Calculate sortedFirstLetters here
  const sortedFirstLetters = [
    ...new Set(
      filteredAuthors
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  const handleClick = (letter) => {
    // console.log("Clicked on letter:", letter);
    // Implement your logic here for scrolling to the corresponding section.
  };

  return (
    <div className="author_filter">
      <AlphabetScrollbar
        letters={sortedFirstLetters}
        handleClick={handleClick}
      />
      <SearchBar
        value={searchQuery}
        onChange={handleAuthorSearchChange}
        placeholder="ძიება ავტორის მიხედვით..."
      />
      <div className="filter_container">
        {showNotFoundMessage && (
          <p className="not_found_msg">
            ავტორი ვერ მოიძებნა, სცადეთ სხვა სახელი.
          </p>
        )}
        <FilteredList
          filteredItems={filteredAuthors}
          handleItemClick={handleAuthorClick}
          dataStatus={isDataFetched}
          // sortedFirstLetters={sortedFirstLetters} // Pass sortedFirstLetters as a prop
        />
      </div>
    </div>
  );
};

export default AuthorFilt;
