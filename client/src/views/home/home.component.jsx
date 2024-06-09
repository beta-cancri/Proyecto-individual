import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideogames, getByName, getDetail } from '../../redux/actions';
import GenreFilter from '../../components/filters/genreFilter';
import PlatformFilter from '../../components/filters/platformFilter';
import Cards from '../../components/cards/cards.components';
import Pagination from '../../components/pagination/pagination.component';
import SourceFilter from '../../components/filters/SourceFilter';
import SortOptionFilter from '../../components/filters/SortOptionFilter';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import styles from './home.module.css';

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

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  const handleCardClick = (id) => {
    dispatch(getDetail(id));
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchString));
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchString('');
    dispatch(getVideogames());
  };

  const handleCreateButtonClick = () => {
    history.push('/create');
  };

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleHomeButtonClick = () => {
    if (history.location.pathname === '/home') {
      history.go(0);
    } else {
      history.push('/home');
    }
  };

  const handleAboutButtonClick = () => {
    history.push('/about');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
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
    <div className={styles.home}>
      <div className={styles.buttonGroup}>
        <button className="button button-back" onClick={handleBackButtonClick}></button>
        <button className="button button-home" onClick={handleHomeButtonClick}></button>
        <button className="button button-create-game" onClick={handleCreateButtonClick}></button>
        <button className="button button-about" onClick={handleAboutButtonClick}></button>
      </div>
      <div className={styles.searchAndFilters}>
        <div className={styles.filterOptions}>
          <GenreFilter genres={genres} selectedGenre={selectedGenre} onChange={handleGenreChange} />
          <PlatformFilter platforms={platforms} selectedPlatform={selectedPlatform} onChange={handlePlatformChange} />
          <SourceFilter sourceFilter={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} />
          <SortOptionFilter sortOption={sortOption} onChange={(e) => setSortOption(e.target.value)} />
          <SortOrderFilter sortOrder={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchString}
            onChange={handleChange}
            placeholder="Search for a videogame..."
            onKeyPress={handleKeyPress}
          />
          <button className="button button-search" onClick={handleSubmit}></button>
          {searchString && <button className="button button-clear-search" onClick={handleClearSearch}></button>}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          nextClassName="button button-next"
          previousClassName="button button-previous"
        />
      </div>
      <Cards allVideogames={paginatedVideogames} onCardClick={handleCardClick} />
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          nextClassName="button button-next"
          previousClassName="button button-previous"
        />
      </div>
    </div>
  );
}

export default Home;
