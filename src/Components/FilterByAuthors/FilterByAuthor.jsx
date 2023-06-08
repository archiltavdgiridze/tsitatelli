// new code
import React, { useState, useEffect } from "react";
// import quoteBase from "../../quoteBase.json";
import { useNavigate } from "react-router-dom";

const FilterByAuthors = () => {
  const url =
    "https://dev-george1meshveliani-api.pantheonsite.io/meshveliani/apis/georgian-quotes";

  // new code
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        console.log(db.data);

        const authorNames = db.data.map((author) => author.attributes.author);
        console.log(authorNames);

        // ~ sort author names in georgian alphabet
        const georgianCollator = new Intl.Collator("ka-GE", {
          sensitivity: "base",
          ignorePunctuation: true,
        });

        authorNames.sort((a, b) => georgianCollator.compare(a, b));

        // ~ push unique authors to authorsList array

        const uniqueAuthorNames = Array.from(new Set(authorNames));
        setAuthors(uniqueAuthorNames);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, []);

  function handleAuthorClick(authorName) {
    fetch(url)
      .then((response) => response.json())
      .then((db) => {
        const filteredQuotes = db.data.filter(
          (author) => author.attributes.author === authorName
        );
        console.log(filteredQuotes);
        setFilteredQuotes(filteredQuotes);
        setSelectedAuthor(authorName);
        navigate("/filtered", {
          state: { filteredQuotes },
        });
      })
      .catch((error) => {
        console.error("Error fetching filtered quotes:", error);
      });
  }

  // ~ group authors by first letter
  const sortedFirstLetters = [
    ...new Set(authors.map((author) => author.charAt(0))),
  ].sort();

  return (
    <div className="result FBA_result">
      <h1>ავტორები:</h1>
      <div className="FBA">
        {/* Group and render authors */}
        {sortedFirstLetters.map((letter) => {
          const authorsWithLetter = authors.filter(
            (author) => author.charAt(0) === letter
          );
          if (authorsWithLetter.length > 0) {
            return (
              <div key={letter} className="FBA_section">
                <h2>{letter}</h2>
                <div className="FBA_buttons">
                  {authorsWithLetter.map((author) => (
                    <button
                      key={author}
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FilterByAuthors;

// old code, in case something goes wrong //
// // ~ georgianCollator is used to sort author names in georgian alphabet
// const georgianCollator = new Intl.Collator("ka-GE", {
//   sensitivity: "base",
//   ignorePunctuation: true,
// });

// quoteBase.sort((a, b) =>
//   georgianCollator.compare(a.nameSurname, b.nameSurname)
// );

// // ~ this code creates a set of unique first letters of author names
// const firstLetters = new Set();

// for (let i = 0; i < quoteBase.length; i++) {
//   const firstLetter = quoteBase[i].nameSurname.charAt(0);
//   firstLetters.add(firstLetter);
// }
// const sortedFirstLetters = [...firstLetters].sort();

// const navigate = useNavigate();

// // ~ this code pushes unique authors to authorsList array
// const [selectedAuthor, setSelectedAuthor] = useState("");
// const [filteredQuotes, setFilteredQuotes] = useState([]);

// let authorsList = [];
// for (let i = 0; i < quoteBase.length; i++) {
//   if (!authorsList.includes(quoteBase[i].nameSurname)) {
//     authorsList.push(quoteBase[i].nameSurname);
//   }
// }

// // ~ this function filters quotes by author name
// function handleAuthorClick(authorName) {
//   const filteredQuotes = quoteBase.filter(
//     (quote) => quote.nameSurname === authorName
//   );
//   setFilteredQuotes(filteredQuotes);
//   setSelectedAuthor(authorName);
//   navigate("/filtered", {
//     state: { filteredQuotes },
//   });
//   // console.log(filteredQuotes);
// }
// old code ^ //

// old code until testing is complete
// import React, { useState } from "react";
// import quoteBase from "../../quoteBase.json";
// import { useNavigate } from "react-router-dom";

// const FilterByAuthors = () => {
//   // ~ georgianCollator is used to sort author names in georgian alphabet
//   const georgianCollator = new Intl.Collator("ka-GE", {
//     sensitivity: "base",
//     ignorePunctuation: true,
//   });

//   quoteBase.sort((a, b) =>
//     georgianCollator.compare(a.nameSurname, b.nameSurname)
//   );

//   // ~ this code creates a set of unique first letters of author names
//   const firstLetters = new Set();

//   for (let i = 0; i < quoteBase.length; i++) {
//     const firstLetter = quoteBase[i].nameSurname.charAt(0);
//     firstLetters.add(firstLetter);
//   }
//   const sortedFirstLetters = [...firstLetters].sort();

//   const navigate = useNavigate();

//   // ~ this code pushes unique authors to authorsList array
//   const [selectedAuthor, setSelectedAuthor] = useState("");
//   const [filteredQuotes, setFilteredQuotes] = useState([]);

//   let authorsList = [];
//   for (let i = 0; i < quoteBase.length; i++) {
//     if (!authorsList.includes(quoteBase[i].nameSurname)) {
//       authorsList.push(quoteBase[i].nameSurname);
//     }
//   }

//   // ~ this function filters quotes by author name
//   function handleAuthorClick(authorName) {
//     const filteredQuotes = quoteBase.filter(
//       (quote) => quote.nameSurname === authorName
//     );
//     setFilteredQuotes(filteredQuotes);
//     setSelectedAuthor(authorName);
//     navigate("/filtered", {
//       state: { filteredQuotes },
//     });
//     // console.log(filteredQuotes);
//   }

//   return (
//     <div className="result FBA_result">
//       <h1>ავტორები:</h1>
//       <div className="FBA">
//         {sortedFirstLetters.map((letter) => (
//           <div key={letter} className=" FBA_section">
//             <h2>{letter}</h2>
//             <div className="FBA_buttons">
//               {authorsList.map((author) => {
//                 if (author.charAt(0) === letter) {
//                   return (
//                     <button
//                       key={author}
//                       onClick={() => handleAuthorClick(author)}
//                     >
//                       {author}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="FBA_quotes">
//         <h1>
//           {selectedAuthor ? (
//             <>
//               {selectedAuthor} – ციტატები
//               <span>({filteredQuotes.length})</span>
//             </>
//           ) : (
//             <>
//               ციტატები
//               <span>({quoteBase.length})</span>
//             </>
//           )}
//         </h1>
//       </div> */}
//     </div>
//   );
// };

// export default FilterByAuthors;
//
//
//
//
