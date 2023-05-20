import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Filtered = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.filteredQuotes) {
      navigate("/filter_by_authors");
    }
  }, [state]);
  return (
    <>
      <div className="result FBA_result">
        <div className="FBA_quotes">
          {state?.filteredQuotes &&
            state.filteredQuotes.map((quote) => (
              <div key={quote.id}>
                <h2>{quote.quote}</h2>
                {/* <p>{quote.source}</p> */}
                {/* <p>{quote.topic}</p> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Filtered;
