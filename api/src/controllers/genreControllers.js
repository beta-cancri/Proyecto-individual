const axios = require('axios');
const { Genre } = require("../db");
const URL = `https://api.rawg.io/api/genres`;
const { DB_KEY } = process.env;
const infoCleanerGenre = require("../utils/index");

const getAllGenres = async () => {
    try {
        
        const genreDB = await Genre.findAll();

        
        const response = await axios.get(`${URL}?key=${DB_KEY}`);
        const genreApi = response.data.results || [];
        
        
        const infoApi = infoCleanerGenre(genreApi);

        
        const existingGenres = await Genre.findAll({ attributes: ['name'] });
        const existingGenreNames = existingGenres.map(genre => genre.name);
        
        
        const uniqueGenres = infoApi.filter(genre => !existingGenreNames.includes(genre.name));

        
        const savedGenres = await Genre.bulkCreate(uniqueGenres);

        console.log('Saved Genres:', savedGenres);

        
        return [...genreDB, ...savedGenres];
    } catch (error) {
        console.error('Error retrieving genres:', error);
        throw error; 
    }
};

module.exports = { getAllGenres };
