import axios from 'axios';
import { formatGameInfo } from '../../utils/formatGameInfo';

const URL = 'https://api.rawg.io/api/games';
const DB_KEY = 'b0af212d619846639e0461611a3010b7';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';

const MAX_ITEMS = 100;

export function getVideogames(limit = MAX_ITEMS) {
  return async function (dispatch) {
    try {
      const fetchPage = async (page) => {
        const response = await axios.get(`${URL}?key=${DB_KEY}&page_size=40&page=${page}`);
        return response.data.results || [];
      };

      const results = await Promise.all([fetchPage(1), fetchPage(2), fetchPage(3)]);
      let allResults = [].concat(...results).slice(0, MAX_ITEMS);

      // Sort by rating
      allResults.sort((a, b) => b.rating - a.rating);

      const formattedResults = allResults.map(formatGameInfo);

      const genres = Array.from(new Set(formattedResults.flatMap(game => game.genres.split(', '))));
      const platforms = Array.from(new Set(formattedResults.flatMap(game => game.platforms.split(', '))));

      dispatch({
        type: GET_VIDEOGAMES,
        payload: { results: formattedResults, genres, platforms },
      });
    } catch (error) {
      console.error('Error fetching videogames:', error);
    }
  };
}

export function getByName(name, limit = MAX_ITEMS) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogame/?name=${encodeURIComponent(name)}`);
      const results = response.data || [];
      console.log('Search results from API and DB:', results);

      dispatch({
        type: GET_BY_NAME,
        payload: results,
      });
    } catch (error) {
      console.error('Error searching the game:', error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/${id}?key=${DB_KEY}`);
      const formattedGame = formatGameInfo(response.data);
      console.log('Fetched videogame details:', formattedGame);
      dispatch({
        type: GET_DETAIL,
        payload: formattedGame,
      });
    } catch (error) {
      console.error('Error fetching videogame details:', error);
    }
  };
}
