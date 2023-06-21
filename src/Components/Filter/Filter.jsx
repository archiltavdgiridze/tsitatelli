import React, { useState, useEffect } from "react";
import AuthorFilt from "./MiniFilter/AuthorFilt";
import TopicFilt from "./MiniFilter/TopicFilt";
import SourceFilt from "./MiniFilter/SourceFilt";

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState(
    sessionStorage.getItem("activeFilter") || "Authors"
  ); // Get the active filter from sessionStorage, default to "Authors" if not set
  const [isMobile, setIsMobile] = useState(false);

  const handleFilterChange = (event) => {
    const filterName = event.target.value;
    setActiveFilter(filterName);
    sessionStorage.setItem("activeFilter", filterName); // Store the active filter in sessionStorage
  };

  const renderMiniFilter = () => {
    switch (activeFilter) {
      case "Topics":
        return <TopicFilt />;
      case "Sources":
        return <SourceFilt />;
      default:
        return <AuthorFilt />;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500); // Adjust the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile/desktop
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    // Render dropdown selector for mobile
    return (
      <div className="result">
        <div className="result_wrapper">
          <select value={activeFilter} onChange={handleFilterChange}>
            <option value="Authors">ავტორები</option>
            <option value="Topics">თემატიკა</option>
            <option value="Sources">წყაროები</option>
          </select>
        </div>
        <div className="filter_result">{renderMiniFilter()}</div>
      </div>
    );
  }

  // Render button-based layout for desktop
  return (
    <div className="result">
      <div className="result_wrapper">
        <div className="filter_buttons">
          <button
            className={activeFilter === "Authors" ? "active" : ""}
            onClick={() => handleFilterChange({ target: { value: "Authors" } })}
          >
            <h4>ავტორები</h4>
          </button>
          <button
            className={activeFilter === "Topics" ? "active" : ""}
            onClick={() => handleFilterChange({ target: { value: "Topics" } })}
          >
            <h4>თემატიკა</h4>
          </button>
          <button
            className={activeFilter === "Sources" ? "active" : ""}
            onClick={() => handleFilterChange({ target: { value: "Sources" } })}
          >
            <h4>წყაროები</h4>
          </button>
        </div>
        <div className="filter_result">{renderMiniFilter()}</div>
      </div>
    </div>
  );
};

export default Filter;

// import React, { useState, useEffect } from "react";
// import AuthorFilt from "./MiniFilter/AuthorFilt";
// import TopicFilt from "./MiniFilter/TopicFilt";
// import SourceFilt from "./MiniFilter/SourceFilt";

// const Filter = () => {
//   const [activeFilter, setActiveFilter] = useState(
//     sessionStorage.getItem("activeFilter") || "Authors"
//   ); // Get the active filter from sessionStorage, default to "Authors" if not set

//   const handleFilterClick = (filterName) => {
//     setActiveFilter(filterName);
//     sessionStorage.setItem("activeFilter", filterName); // Store the active filter in sessionStorage
//   };

//   const renderMiniFilter = () => {
//     switch (activeFilter) {
//       case "Topics":
//         return <TopicFilt />;
//       case "Sources":
//         return <SourceFilt />;
//       default:
//         return <AuthorFilt />;
//     }
//   };

//   return (
//     <div className="result">
//       <div className="result_wrapper">
//         <div className="filter_buttons">
//           <button
//             className={activeFilter === "Authors" ? "active" : ""}
//             onClick={() => handleFilterClick("Authors")}
//           >
//             ავტორები
//           </button>
//           <button
//             className={activeFilter === "Topics" ? "active" : ""}
//             onClick={() => handleFilterClick("Topics")}
//           >
//             თემატიკა
//           </button>
//           <button
//             className={activeFilter === "Sources" ? "active" : ""}
//             onClick={() => handleFilterClick("Sources")}
//           >
//             წყაროები
//           </button>
//         </div>
//         <div className="filter_result">{renderMiniFilter()}</div>
//       </div>
//     </div>
//   );
// };

// export default Filter;
