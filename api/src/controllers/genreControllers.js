const axios = require('axios');
const { Genre } = require("../db");
const URL = `https://api.rawg.io/api/genres`;
const { DB_KEY } = process.env;
const { infoCleanerGenre } = require("../utils/index");

const getAllGenres = async () => {
    try {
        console.log("Fetching genres from API...");
        const response = await axios.get(`${URL}?key=${DB_KEY}`);
        const genreApi = response.data.results || [];
        const infoApi = infoCleanerGenre(genreApi);

        console.log("Genres from API:", infoApi);

        const existingGenres = await Genre.findAll({ attributes: ['id', 'name'] });
        const existingGenreNames = existingGenres.map(genre => genre.name);

        const uniqueGenres = infoApi.filter(genre => !existingGenreNames.includes(genre.name));

        console.log("Unique genres to be saved:", uniqueGenres);

        const savedGenres = await Genre.bulkCreate(uniqueGenres, { ignoreDuplicates: true });

        console.log('Saved Genres:', savedGenres);

        return [...existingGenres, ...savedGenres];
    } catch (error) {
        console.error('Error retrieving genres:', error);
        throw error; 
    }
};

module.exports = { getAllGenres };
