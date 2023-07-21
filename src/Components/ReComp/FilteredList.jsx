import React from "react";
import { Skeleton } from "@mui/lab";
import "../Filter/MiniFilter/minifilter.css"

const FilteredList = ({ filteredItems, handleItemClick, dataStatus }) => {
  const sortedFirstLetters = [
    ...new Set(
      filteredItems
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  return (
    <>
      <div className="filter_cards_container">
        {sortedFirstLetters.map((letter) => {
          const itemsWithLetter = filteredItems.filter(
            (item) => typeof item === "string" && item.charAt(0) === letter
          );
          if (itemsWithLetter.length > 0) {
            return (
              <div key={letter} className="filt_cont_div ">
                <h2 id={letter}>{letter}</h2>
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
      </div>
    </>
  );
};

export default FilteredList;
