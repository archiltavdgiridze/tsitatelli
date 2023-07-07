import React from "react";

const FilteredList = ({ filteredItems, handleItemClick }) => {
  const sortedFirstLetters = [
    ...new Set(
      filteredItems
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  return (
    <>
      {sortedFirstLetters.map((letter) => {
        const itemsWithLetter = filteredItems.filter(
          (item) => typeof item === "string" && item.charAt(0) === letter
        );
        if (itemsWithLetter.length > 0) {
          return (
            <div key={letter} className="filt_cont_div">
              <h2>{letter}</h2>
              <div className="filt_cont_btn">
                {itemsWithLetter.map((item) => (
                  <button key={item} onClick={() => handleItemClick(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default FilteredList;
