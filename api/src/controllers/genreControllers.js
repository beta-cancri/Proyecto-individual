const axios = require('axios');

const {Genre} = require("../db");

const URL = `https://api.rawg.io/api/genres`;

const { DB_KEY } = process.env;

const infoCleanerGenre = require("../utils/index");

const getAllGenres = async () => {
    
    const genreDB = await Genre.findAll();

    const response = await axios.get(`${URL}?key=${DB_KEY}`);

    const genreApi = response.data.results || [];

    const infoApi = infoCleanerGenre(genreApi);

    const savedGenres = await Genre.bulkCreate(infoApi, { ignoreDuplicates: true });
        console.log('Saved Genres:', savedGenres);

    return [...genreDB, ...infoApi];
};

module.exports = {getAllGenres};