import { Link } from "react-router-dom";
import './card.styles.css';

function Card({ videogame }) {
  console.log("Rendering videogame:", videogame);

  const { name, genres, image, id } = videogame;

  const cardStyle = {
    backgroundImage: `url(${image})`,
    
  };

  return (
    <div className='card-container' style={cardStyle}>
      <Link to={`home/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{name || "No name available"}</h2>
        <p>{genres || "No genres available"}</p>
      </Link>
    </div>
  );
}

export default Card;
