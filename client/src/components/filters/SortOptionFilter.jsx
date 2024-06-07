import React from 'react';

const SortOptionFilter = ({ sortOption, onChange }) => {
  return (
    <div>
      <label>Sort By: </label>
      <select value={sortOption} onChange={onChange}>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default SortOptionFilter;
