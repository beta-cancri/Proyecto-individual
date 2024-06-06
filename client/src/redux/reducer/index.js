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
        allVideogames: action.payload,
        videogamesCopy: action.payload,
      };
    case GET_BY_NAME:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          allVideogames: action.payload,
        };
      } else {
        return state;
      }
    case GET_DETAIL:
      console.log("Payload received in GET_DETAIL:", action.payload);
      return {
        ...state,
        currentVideogame: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
