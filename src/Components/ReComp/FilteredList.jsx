import React from "react";
import { Skeleton } from "@mui/lab";

const FilteredList = ({ filteredItems, handleItemClick, dataStatus }) => {
  const sortedFirstLetters = [
    ...new Set(
      filteredItems
        .filter((item) => typeof item === "string")
        .map((item) => item.charAt(0))
    ),
  ].sort();

  const content = dataStatus ? (
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
  ) : (
    <>
      {sortedFirstLetters.map((letter) => {
        const itemsWithLetter = filteredItems.filter(
          (item) => typeof item === "string" && item.charAt(0) === letter
        );
        if (itemsWithLetter.length > 0) {
          return (
            <div key={letter} className="filt_cont_div">
              <Skeleton
                animation="wave"
                variant="text"
                width="5%"
                height="50px"
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                height="50px"
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                height="50px"
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );

  return content;
};

export default FilteredList;
