import { Link } from "react-router-dom";
import './card.styles.css';

function Card({ id, name, genres, image, onClick }) {
  console.log("Rendering videogame:", { id, name, genres, image }); 

  const cardStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className='card-container' style={cardStyle} onClick={onClick}>
      <Link to={`home/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{name || "No name available"}</h2>
        <p>{genres || "No genres available"}</p>
      </Link>
    </div>
  );
}

export default Card;
