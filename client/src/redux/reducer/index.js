
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
                return{
                    ...state,
                    allVideogames: action.payload,
                };
        default:
            return state;
    }
}

export default rootReducer;
