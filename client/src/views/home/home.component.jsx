import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getVideogames, getDetail } from '../../redux/actions';
import Navbar from '../../components/navbar/navbar.components';
import Cards from '../../components/cards/cards.components';
import Pagination from '../../components/pagination/pagination.component';
import GenreFilter from '../../components/filters/genreFilter';
import PlatformFilter from '../../components/filters/platformFilter';
import './home.styles.css';

const ITEMS_PER_PAGE = 15;
const MAX_ITEMS = 100;

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  function handleGenreChange(e) {
    setSelectedGenre(e.target.value);
  }

  function handlePlatformChange(e) {
    setSelectedPlatform(e.target.value);
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    console.log('Updated allVideogames in Home component:', allVideogames);
  }, [allVideogames]);

  function handleCardClick(id) {
    dispatch(getDetail(id));
  }

  const totalPages = Math.ceil(Math.min(allVideogames.length, MAX_ITEMS) / ITEMS_PER_PAGE);

  const paginatedVideogames = allVideogames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filteredVideogames = paginatedVideogames.filter(game => {
    return (
      (!selectedGenre || game.genres.includes(selectedGenre)) &&
      (!selectedPlatform || game.platforms.includes(selectedPlatform))
    );
  }).map(game => ({
    id: game.id || 'N/A',
    name: game.name || 'No name available',
    genres: game.genres,
    image: game.image,
  }));

  console.log('Filtered videogames:', filteredVideogames);

  return (
    <div className="home">
      <h2 className='home-title'>Home Page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onChange={handleGenreChange} />
      <PlatformFilter platforms={platforms} selectedPlatform={selectedPlatform} onChange={handlePlatformChange} />
      <Cards allVideogames={filteredVideogames} onCardClick={handleCardClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
