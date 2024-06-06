import React from 'react';

const PlatformFilter = ({ platforms, selectedPlatform, onChange }) => {
  return (
    <div>
      <label htmlFor="platform">Platform:</label>
      <select id="platform" value={selectedPlatform} onChange={onChange}>
        <option value="">All</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>
    </div>
  );
};

export default PlatformFilter;
