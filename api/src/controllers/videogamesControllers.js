const axios = require('axios');
const { Videogame, Genre } = require("../db");
const URL = `https://api.rawg.io/api/games`;
const { DB_KEY } = process.env;
const infoCleaner = require("../utils/index");
const { Op } = require("sequelize");

const createVideogameDB = async (name, description, platforms, image, released, rating, genreIds) => {
    const game = await Videogame.create({ name, description, platforms, image, released, rating });
    await game.setGenres(genreIds);
    return game;
};

const getVideogameById = async (id, source) => {
    const videogame = source === "api" ? (await axios.get(`${URL}/${id}?key=${DB_KEY}`)).data :
        await Videogame.findByPk(id, {
            include: {
                model: Genre,
                attributes: ["name"],
            },
        });
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
    const regex = new RegExp(name, "i");

    const response = await axios.get(`${URL}?search=${name}&key=${DB_KEY}`);
    const videogameApi = response.data.results || [];
    const infoApi = infoCleaner(videogameApi);

    const videogameFiltered = infoApi.filter(videogame => regex.test(videogame.name));

    const videogameDb = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });

    return [...videogameFiltered, ...videogameDb];
};

module.exports = { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName };
