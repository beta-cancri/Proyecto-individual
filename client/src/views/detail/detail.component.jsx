import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import './detail.styles.css';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.currentVideogame);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  if (Object.keys(videogame).length === 0) {
    return <div>Loading...</div>;
  }

  const { name, genres, image, platforms, description, released, rating } = videogame;

  console.log("Rendering videogame:", videogame); // Log the entire videogame object to check for the released property
  console.log("Background image URL:", image);

  const cardStyle = {
    backgroundImage: `url(${image})`,
  };

  const renderPlatforms = () => {
    if (typeof platforms === 'string') {
      return platforms;
    }
    return platforms.map(platform => platform.platform.name).join(', ');
  };

  const renderGenres = () => {
    if (typeof genres === 'string') {
      return genres;
    }
    return genres.map(genre => genre.name).join(', ');
  };

  return (
    <div className='detail-container' style={cardStyle}>
      <h2>{name || "No name available"}</h2>
      <p>ID: {id}</p>
      <p>Platforms: {renderPlatforms()}</p>
      <p>Description: {description ? description.replace(/<[^>]+>/g, '') : "No description available"}</p>
      <p>Released: {released}</p> {/* Ensure this line is correct */}
      <p>Rating: {rating}</p>
      <p>Genres: {renderGenres()}</p>
    </div>
  );
}

export default Detail;
