import { Link } from "react-router-dom";
import styles from './card.module.css';

function Card({ id, name, genres, image, onClick, style }) {
  console.log("Rendering videogame:", { id, name, genres, image }); 

  return (
    <div className={styles.cardContainer} onClick={onClick} style={style}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <Link to={`home/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>{name || "No name available"}</h2>
          <p>{genres || "No genres available"}</p>
        </Link>
      </div>
    </div>
  );
}

export default Card;
