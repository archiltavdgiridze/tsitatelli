import React from 'react'

const Search = ({ value, onChange, placeholder }) => {
  return (
    <div className='search_div'>
      <input
        className="search_bar"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search