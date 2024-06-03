// reducer.js
import { GET_VIDEOGAMES, GET_BY_NAME, GET_DETAIL } from '../actions';

const initialState = {
  allVideogames: [],
  videogamesCopy: [],
  genres: [],
  currentVideogame: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload.results || [],
        videogamesCopy: action.payload.results || []
      };
    case GET_BY_NAME:
      const searchString = action.payload.toLowerCase();
      const filteredVideogames = state.videogamesCopy.filter(videogame =>
        videogame.name.toLowerCase().includes(searchString)
      );
      return {
        ...state,
        allVideogames: filteredVideogames,
      };
      case GET_DETAIL:
        console.log("Payload received in GET_DETAIL:", action.payload);
        return {
          ...state,
          currentVideogame: action.payload 
        };
      
    default:
      return state;
  }
}

export default rootReducer;
