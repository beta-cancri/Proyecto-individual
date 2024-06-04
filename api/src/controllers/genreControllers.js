const axios = require('axios');
const { Genre } = require("../db");
const URL = `https://api.rawg.io/api/genres`;
const { DB_KEY } = process.env;
const infoCleanerGenre = require("../utils/index");

const getAllGenres = async () => {
    try {
        // Retrieve genres from the database
        const genreDB = await Genre.findAll();

        // Retrieve genres from the external API
        const response = await axios.get(`${URL}?key=${DB_KEY}`);
        const genreApi = response.data.results || [];
        
        // Clean and process the API data
        const infoApi = infoCleanerGenre(genreApi);

        // Check for duplicate genre names in the database
        const existingGenres = await Genre.findAll({ attributes: ['name'] });
        const existingGenreNames = existingGenres.map(genre => genre.name);
        
        // Filter out duplicate genre names from the API data
        const uniqueGenres = infoApi.filter(genre => !existingGenreNames.includes(genre.name));

        // Bulk create the unique genres
        const savedGenres = await Genre.bulkCreate(uniqueGenres);

        console.log('Saved Genres:', savedGenres);

        // Return the merged array of genres
        return [...genreDB, ...savedGenres];
    } catch (error) {
        console.error('Error retrieving genres:', error);
        throw error; // Re-throw the error for handling by the caller
    }
};

module.exports = { getAllGenres };
