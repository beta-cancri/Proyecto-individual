import React from 'react';

const GenreFilter = ({ genres, selectedGenre, onChange }) => {
  return (
    <div>
      <label htmlFor="genre">Genre:</label>
      <select id="genre" value={selectedGenre} onChange={onChange}>
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
