import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getByName, getVideogames, getDetail } from "../../redux/actions";
import Navbar from '../../components/navbar/navbar.components';
import Cards from '../../components/cards/cards.components';
import Pagination from '../../components/pagination/pagination.component'; // Ensure correct import
import './home.styles.css';

const ITEMS_PER_PAGE = 15;
const MAX_ITEMS = 100;

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    dispatch(getDetail(id));
  }

  const transformVideogames = (videogames) => {
    return videogames.map(game => {
      const transformedGame = {
        id: game.id || "N/A",
        name: game.name || "No name available",
        genres: Array.isArray(game.genres) ? game.genres.map(genre => genre.name).join(', ') : "No genres available",
        image: game.background_image || "https://static.javatpoint.com/fullformpages/images/ina-full-form4.png",
        rating: game.rating || 0,
      };
      console.log('Transformed Game:', transformedGame);
      return transformedGame;
    });
  };

  const sortedVideogames = transformVideogames(allVideogames).sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(Math.min(sortedVideogames.length, MAX_ITEMS) / ITEMS_PER_PAGE);

  const paginatedVideogames = sortedVideogames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  console.log("Displayed videogames:", paginatedVideogames);

  return (
    <div className="home">
      <h2 className='home-title'>Home Page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={paginatedVideogames} onCardClick={handleCardClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;

