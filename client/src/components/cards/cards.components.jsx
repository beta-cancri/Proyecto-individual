import React from 'react';
import Card from '../card/card.components';
import './cards.styles.css';

function Cards({ allVideogames, onCardClick }) {
  const videogamesList = Array.isArray(allVideogames) ? allVideogames : [];

  console.log("Rendering Cards component with videogamesList:", videogamesList); 

  return (
    <div className='card-list'>
      {videogamesList.length > 0 ? (
        videogamesList.map((videogame) => (
          <Card
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            genres={videogame.genres}
            image={videogame.image}
            onClick={() => onCardClick(videogame.id)}
          />
        ))
      ) : (
        <div>No videogames available</div>
      )}
    </div>
  );
}

export default Cards;
