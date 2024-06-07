import React from 'react';

const SortOrderFilter = ({ sortOrder, onChange }) => {
  return (
    <div>
      <label>Order: </label>
      <select value={sortOrder} onChange={onChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortOrderFilter;
