
import { GET_VIDEOGAMES, GET_BY_NAME } from '../actions';

const initialState = {
    allVideogames: [],
    videogamesCopy:[],
    genres: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload.results || [], // Ensure we're accessing the results array
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
    default:
      return state;
    }
}

export default rootReducer;
