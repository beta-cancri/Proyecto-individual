import React from 'react';
import Card from '../card/card.components';
import './cards.styles.css';

function Cards({ allVideogames, onCardClick }) {
  // check if is an array because of an unexpected error
  const videogamesList = Array.isArray(allVideogames) ? allVideogames : [];

  console.log("Rendering Cards component with videogamesList:", videogamesList);

  return (
    <div className='card-list'>
      {videogamesList.length > 0 ? (
        videogamesList.map((videogame) => (
          <Card key={videogame.id} videogame={videogame} onClick={() => onCardClick(videogame.id)} />
        ))
      ) : (
        <div>No videogames available</div>
      )}
    </div>
  );
}

export default Cards;
