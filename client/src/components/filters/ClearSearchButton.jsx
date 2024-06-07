import React from 'react';
import { useHistory } from 'react-router-dom';

const ClearSearchButton = ({ onClear }) => {
  const history = useHistory();

  const handleClick = () => {
    onClear();
    history.push('/home'); // Ensure it refreshes the Home component
  };

  return (
    <button onClick={handleClick}>
      Clear Search
    </button>
  );
};

export default ClearSearchButton;
