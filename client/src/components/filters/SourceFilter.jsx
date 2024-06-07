import React from 'react';

const SourceFilter = ({ sourceFilter, onChange }) => {
  return (
    <div>
      <label>Source: </label>
      <select value={sourceFilter} onChange={onChange}>
        <option value="all">All</option>
        <option value="database">Database</option>
        <option value="api">API</option>
      </select>
    </div>
  );
};

export default SourceFilter;
