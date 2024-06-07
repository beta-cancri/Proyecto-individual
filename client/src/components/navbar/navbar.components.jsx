import React from 'react';
import ClearSearchButton from '../filters/ClearSearchButton';
import './navbar.styles.css';

const Navbar = ({ handleChange, handleSubmit, searchString, handleClearSearch }) => {
  return (
    <div className="navbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a videogame..."
          value={searchString}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
        {searchString && <ClearSearchButton onClear={handleClearSearch} />}
      </form>
    </div>
  );
};

export default Navbar;
