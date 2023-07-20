// import React from "react";
// import SearchBar from "./../../ReComp/SearchBar";
// import FilteredList from "../../ReComp/FilteredList";
// import useMiniFilterHandlers from "../../Hooks/ForFilter/useMiniFilterHandlers";
// import AlphabetScrollbar from "../../ReComp/AlphabetScrollbar";

// // Custom hook to handle the letter card references and scrolling
// const useScrollToLetter = (sortedFirstLetters) => {
//   const letterCardRefs = React.useRef({});

//   const scrollToLetter = (letter) => {
//     // Find the corresponding letter's card using its ref
//     const letterCardRef = letterCardRefs.current[letter];

//     if (letterCardRef) {
//       // Get the height of the fixed navbar
//       const navbarHeight = 130; // Replace this with the actual height of your fixed navbar in pixels

//       // Get the position of the target element relative to the viewport
//       const rect = letterCardRef.getBoundingClientRect();

//       // Calculate the vertical scroll position to ensure the element is below the navbar
//       const scrollPosition = window.pageYOffset + rect.top - navbarHeight;

//       // Scroll the page to the calculated position with a smooth behavior
//       window.scrollTo({ top: scrollPosition, behavior: "smooth" });
//     }
//   };

//   // Update the refs whenever the sortedFirstLetters change
//   React.useEffect(() => {
//     letterCardRefs.current = sortedFirstLetters.reduce((refs, letter) => {
//       refs[letter] = React.createRef();
//       return refs;
//     }, {});
//   }, [sortedFirstLetters]);

//   return { letterCardRefs, scrollToLetter };
// };

// export default useScrollToLetter