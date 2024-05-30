const axios = require('axios');

const { Videogame } = require("../db");

const URL = `https://api.rawg.io/api/games`;

const { DB_KEY } = process.env;

const infoCleaner = require("../utils/index");


const createVideogameDB = async (name, description, platforms, image, released, rating) => {

    return await Videogame.create({ name, description, platforms, image, released, rating });

};

const getVideogameById = async (id, source) => {

    const videogame = source === "api" ? (await axios.get(`${URL}/${id}?key=${DB_KEY}`)).data :
        await Videogame.findByPk(id);
    return videogame;

};



const getAllVideogames = async () => {
    
    const videogameDB = await Videogame.findAll();

    const response = await axios.get(`${URL}?key=${DB_KEY}`);

    const videogameApi = response.data.results || [];

    const infoApi = infoCleaner(videogameApi);

    return [...videogameDB, ...infoApi];
};

const getVideogameByName = async (name) => {

    const response = await axios.get(`${URL}?search=${name}&key=${DB_KEY}`);

    const videogameApi = response.data.results || [];

    const infoApi = infoCleaner(videogameApi);

    const videogameFiltered = infoApi.filter(videogame => videogame.name === name);

    const videogameDb = await Videogame.findAll({ where: { name: name } });

    return [...videogameFiltered, ...videogameDb];
}
module.exports = { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName };