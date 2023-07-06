import React from "react";
import Pagination from "@mui/material/Pagination";
import "./RecompCSS/pagination.css";

const PaginationComponent = ({ totalPages, currentPage, handlePageChange, color  }) => {
  return (
    <div className="pagination">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "var(--accentColor) !important", // Set your custom color here
            color: "white", // Set the text color for the selected page
            "&:hover": {
              backgroundColor: "var(--accentColorHover) !important", // Set the background color on hover
            },
          },
        }}
      />
    </div>
  );
};

export default PaginationComponent;