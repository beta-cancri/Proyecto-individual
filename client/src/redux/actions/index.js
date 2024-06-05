import axios from "axios";

const URL = "https://api.rawg.io/api/games";
const DB_KEY = "b0af212d619846639e0461611a3010b7";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";

export function getVideogames() {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${URL}?key=${DB_KEY}`);
            console.log("Fetched videogames:", response.data); 
            dispatch({
                type: "GET_VIDEOGAMES",
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching videogames:", error);
        }
    };
}

export function getByName(name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/videogame?name=${encodeURIComponent(name)}`);
        console.log("Fetched videogames by name:", response.data); 
        dispatch({
          type: "GET_BY_NAME",
          payload: response.data,
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
          type: "GET_DETAIL",
          payload: response.data
        });
      } catch (error) {
        console.error("Error fetching videogame details:", error);
      }
    };
}
