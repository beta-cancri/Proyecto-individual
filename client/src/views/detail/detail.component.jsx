import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import './detail.styles.css';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.currentVideogame);
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.body.classList.add('detail-page');
    return () => {
      document.body.classList.remove('detail-page');
    };
  }, []);

  if (Object.keys(videogame).length === 0) {
    return <div>Loading...</div>;
  }

  const { name, genres, image, platforms, description, released, rating } = videogame;

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

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleHomeButtonClick = () => {
    history.push('/home');
  };

  return (
    <div className='detail-container' style={cardStyle}>
      <div className='detail-overlay'></div>
      <div className='button-group'>
        <button className="button button-home" onClick={handleHomeButtonClick}></button>
        <button className="button button-back" onClick={handleBackButtonClick}></button>
      </div>
      <div className='detail-content'>
        <h2>{name || "No name available"}</h2>
        <p>ID: {id}</p>
        <p>Platforms: {renderPlatforms()}</p>
        <p>Description: {description ? description.replace(/<[^>]+>/g, '') : "No description available"}</p>
        <p>Released: {released}</p>
        <p>Rating: {rating}</p>
        <p>Genres: {renderGenres()}</p>
      </div>
    </div>
  );
}

export default Detail;
