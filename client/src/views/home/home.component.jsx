import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getByName, getVideogames, getDetail } from "../../redux/actions";

import Navbar from '../../components/navbar/navbar.components';
import Cards from '../../components/cards/cards.components';

import './home.styles.css';

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated allVideogames in Home component:", allVideogames);
  }, [allVideogames]);

  function handleCardClick(id) {
    dispatch(getDetail(id)); // Dispatch getDetail action with the id of the selected videogame
  }

  // transformation of genres since it was an object this is only for home
  const filteredVideogames = allVideogames.map(game => ({
    id: game.id,
    name: game.name,
    genres: game.genres ? game.genres.map(genre => genre.name).join(', ') : "No genres available",
    image: game.background_image
  }));

  return (
    <div className="home">
      <h2 className='home-title'>Home Page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={filteredVideogames} onCardClick={handleCardClick} />
    </div>
  );
}

export default Home;
