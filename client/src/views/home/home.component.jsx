import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideogames, getByName, getDetail } from '../../redux/actions';
import Navbar from '../../components/navbar/navbar.components';
import GenreFilter from '../../components/filters/genreFilter';
import PlatformFilter from '../../components/filters/platformFilter';
import Cards from '../../components/cards/cards.components';
import Pagination from '../../components/pagination/pagination.component';
import SourceFilter from '../../components/filters/SourceFilter';
import SortOptionFilter from '../../components/filters/SortOptionFilter';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allVideogames = useSelector(state => state.allVideogames || []);
  const genres = useSelector(state => state.genres || []);
  const platforms = useSelector(state => state.platforms || []);

  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');

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
    console.log('Dispatching getVideogames action');
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    console.log('Updated allVideogames in Home component:', allVideogames);
  }, [allVideogames]);

  function handleCardClick(id) {
    dispatch(getDetail(id));
  }

  const handleClearSearch = () => {
    setSearchString('');
    dispatch(getVideogames());
  };

  const handleCreateButtonClick = () => {
    history.push('/create');
  };

  const totalPages = Math.ceil(allVideogames.length / ITEMS_PER_PAGE);

  let filteredVideogames = allVideogames.filter(game => {
    return (
      (!selectedGenre || (game.genres && game.genres.includes(selectedGenre))) &&
      (!selectedPlatform || (game.platforms && game.platforms.includes(selectedPlatform))) &&
      (sourceFilter === 'all' || (sourceFilter === 'database' && game.created) || (sourceFilter === 'api' && !game.created))
    );
  });

  if (sortOption === 'rating') {
    filteredVideogames = filteredVideogames.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
  } else if (sortOption === 'name') {
    filteredVideogames = filteredVideogames.sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }

  const paginatedVideogames = filteredVideogames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="home">
      <h2 className='home-title'>Home Page</h2>
      <Navbar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
        handleClearSearch={handleClearSearch}
      />
      <button className="create-button" onClick={handleCreateButtonClick}>Create New Game</button>
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onChange={handleGenreChange} />
      <PlatformFilter platforms={platforms} selectedPlatform={selectedPlatform} onChange={handlePlatformChange} />
      <SourceFilter sourceFilter={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} />
      <SortOptionFilter sortOption={sortOption} onChange={(e) => setSortOption(e.target.value)} />
      <SortOrderFilter sortOrder={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
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
