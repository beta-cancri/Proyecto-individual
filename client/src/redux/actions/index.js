import axios from "axios";


const URL = "https://api.rawg.io/api/games";
const DB_KEY = "b0af212d619846639e0461611a3010b7";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";

export function getVideogames() {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${URL}?key=${DB_KEY}&page_size=12`);
            console.log("Fetched videogames:", response.data); // Log the response data to verify its structure
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching videogames:", error);
        }
    };
}

export function getByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogame/?name=${String(name)}`);
            dispatch({
                type: "GET_BY_NAME",
                payload: String(name) // payload is always a string
            });
        } catch (error) {
            console.error("Error searching the game:", error);
        }
    };
}