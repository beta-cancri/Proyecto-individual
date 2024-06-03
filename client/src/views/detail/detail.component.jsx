import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import './detail.styles.css';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.currentVideogame);

  console.log("Rendering videogame:", videogame);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  if (Object.keys(videogame).length === 0) {
    return <div>Loading...</div>;
  }

  const { name, genres, background_image, platforms, description, released, rating } = videogame;

  console.log("Background image URL:", background_image);

  const cardStyle = {
    backgroundImage: `url(${background_image})`,
  };

  const renderPlatforms = () => {
    return platforms.map(platform => platform.platform.name).join(', ');
  };

  const renderGenres = () => {
    return genres.map(genre => genre.name).join(', ');
  };

  return (
    <div className='detail-container' style={cardStyle}>
      <h2>{name || "No name available"}</h2>
      <p>ID: {id}</p>
      <p>Platforms: {renderPlatforms()}</p>
      <p>Description: {description.replace(/<[^>]+>/g, '')}</p>
      <p>Released: {released}</p>
      <p>Rating: {rating}</p>
      <p>Genres: {renderGenres()}</p>
    </div>
  );
}

export default Detail;

