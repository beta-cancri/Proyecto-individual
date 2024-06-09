import React, { useEffect } from 'react';
import { useSprings, animated, config } from '@react-spring/web';
import Card from '../card/card.components';
import styles from './cards.module.css';

function Cards({ allVideogames, onCardClick }) {
  const videogamesList = Array.isArray(allVideogames) ? allVideogames : [];

  const [springs, api] = useSprings(videogamesList.length, index => ({
    from: { transform: 'translate3d(100%, 0, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    config: { tension: 200, friction: 20 },
    delay: index * 100,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      api.start(index => {
        const element = document.getElementById(`card-${index}`);
        if (element) {
          const offsetTop = element.offsetTop;
          const isVisible = scrollTop + window.innerHeight >= offsetTop && scrollTop <= offsetTop + element.clientHeight;
          if (isVisible) {
            return { transform: 'translate3d(0, 0, 0)', opacity: 1 };
          }
          if (scrollTop + window.innerHeight < offsetTop) {
            return { transform: 'translate3d(100%, 0, 0)', opacity: 0 };
          }
          return { transform: 'translate3d(-100%, 0, 0)', opacity: 0 };
        }
        return {};
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [api, videogamesList.length]);

  console.log("Rendering Cards component with videogamesList:", videogamesList);

  return (
    <div className={styles.cardList}>
      {springs.map((style, index) => (
        <animated.div key={index} id={`card-${index}`} style={style}>
          <Card
            key={videogamesList[index].id}
            id={videogamesList[index].id}
            name={videogamesList[index].name}
            genres={videogamesList[index].genres}
            image={videogamesList[index].image}
            onClick={() => onCardClick(videogamesList[index].id)}
          />
        </animated.div>
      ))}
    </div>
  );
}

export default Cards;
