import axios from "axios";

const URL = "https://api.rawg.io/api/games";
const DB_KEY = "b0af212d619846639e0461611a3010b7";
const MAX_ITEMS = 100;
const ITEMS_PER_REQUEST = 40;  // Adjust this if the API allows more items per request

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";

export function getVideogames(limit = MAX_ITEMS) {
    return async function(dispatch) {
        try {
            let fetchedGames = [];
            let page = 1;

            while (fetchedGames.length < limit) {
                const response = await axios.get(`${URL}?key=${DB_KEY}&page_size=${ITEMS_PER_REQUEST}&page=${page}`);
                const newGames = response.data.results || [];
                fetchedGames = [...fetchedGames, ...newGames];

                if (newGames.length < ITEMS_PER_REQUEST) {
                    // If fewer games are returned than requested, we've reached the end of the results
                    break;
                }

                page += 1;
            }

            // Sort by rating before dispatching
            const sortedGames = fetchedGames.slice(0, limit).sort((a, b) => b.rating - a.rating);

            console.log("Fetched and sorted videogames:", sortedGames);
            dispatch({
                type: GET_VIDEOGAMES,
                payload: sortedGames,
            });
        } catch (error) {
            console.error("Error fetching videogames:", error);
        }
    };
}

export function getByName(name, limit = MAX_ITEMS) {
    return async function (dispatch) {
        try {
            let fetchedGames = [];
            let page = 1;

            while (fetchedGames.length < limit) {
                const response = await axios.get(`${URL}?key=${DB_KEY}&search=${encodeURIComponent(name)}&page_size=${ITEMS_PER_REQUEST}&page=${page}`);
                const newGames = response.data.results || [];
                fetchedGames = [...fetchedGames, ...newGames];

                if (newGames.length < ITEMS_PER_REQUEST) {
                    // If fewer games are returned than requested, we've reached the end of the results
                    break;
                }

                page += 1;
            }

            // Sort by rating before dispatching
            const sortedGames = fetchedGames.slice(0, limit).sort((a, b) => b.rating - a.rating);

            console.log("Fetched and sorted videogames by name:", sortedGames);
            dispatch({
                type: GET_BY_NAME,
                payload: sortedGames,
            });
        } catch (error) {
            console.error("Error searching the game:", error);
        }
    };
}

export function getDetail(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${URL}/${id}?key=${DB_KEY}`);
            console.log("Fetched videogame details:", response.data);
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching videogame details:", error);
        }
    };
}
