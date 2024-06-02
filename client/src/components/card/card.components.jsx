import './card.styles.css';

function Card({ videogame }) {
  console.log("Rendering videogame:", videogame);

  const { name, description, platforms, background_image, released, rating } = videogame;

  // Extract platform names from the platforms array of objects
  const platformNames = platforms?.map(platformObj => platformObj.platform.name).join(', ');

  return (
    <div className='card-container'>
      <h2>{name || "No name available"}</h2>
      <p>{description || "No description available"}</p>
      <p>{platformNames || "No platforms available"}</p>
      {background_image && <img src={background_image} alt={name} style={{ width: '100px', height: '100px' }} />}
      <p>{released ? new Date(released).toDateString() : "No release date available"}</p>
      <p>{rating !== undefined ? rating : "No rating available"}</p>
    </div>
  );
}

export default Card;
