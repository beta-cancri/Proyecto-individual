import { GET_VIDEOGAMES, GET_BY_NAME, GET_DETAIL } from '../actions';

const initialState = {
  allVideogames: [],
  videogamesCopy: [],
  genres: [],
  platforms: [],
  currentVideogame: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      console.log('GET_VIDEOGAMES payload:', action.payload);
      return {
        ...state,
        allVideogames: action.payload.results || [],
        videogamesCopy: action.payload.results || [],
        genres: action.payload.genres || [],
        platforms: action.payload.platforms || [],
      };
    case GET_BY_NAME:
      console.log('GET_BY_NAME payload:', action.payload);
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          allVideogames: action.payload,
        };
      } else {
        return state;
      }
    case GET_DETAIL:
      console.log('Payload received in GET_DETAIL:', action.payload);
      return {
        ...state,
        currentVideogame: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
