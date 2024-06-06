const axios = require('axios');
const { Videogame, Genre } = require("../db");
const URL = `https://api.rawg.io/api/games`;
const { DB_KEY } = process.env;
const { infoCleaner } = require("../utils/index");
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
    try {
        // Fetch games from the API
        console.log(`Fetching from API: ${URL}?search=${name}&key=${DB_KEY}`);
        const apiResponse = await axios.get(`${URL}?search=${name}&key=${DB_KEY}`);
        const videogameApi = apiResponse.data.results || [];
        const infoApi = infoCleaner(videogameApi);
        console.log('API results:', infoApi);

        // Fetch games from the database
        console.log(`Fetching from DB: ${name}`);
        const dbResults = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
        const formattedDbResults = dbResults.map(game => ({
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms,
            image: game.image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
            released: game.released,
            rating: game.rating,
            genres: game.genres || 'No genres available',
            created: true,
        }));
        console.log('Database results:', formattedDbResults);

        // Combine API and database results
        const combinedResults = [...infoApi, ...formattedDbResults];
        console.log('Combined results:', combinedResults);

        // Filter results to match the search term
        const regex = new RegExp(name, "i");
        const filteredResults = combinedResults.filter(game => regex.test(game.name));
        console.log('Filtered results:', filteredResults);

        // Ensure all games have an image and genres
        const validResults = filteredResults.map(game => ({
            ...game,
            image: game.image ? game.image : 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
            genres: game.genres ? game.genres : 'No genres available',
        }));
        console.log('Valid results:', validResults);

        // Sort by rating
        const sortedResults = validResults.sort((a, b) => b.rating - a.rating);
        console.log('Sorted results:', sortedResults);

        return sortedResults;
    } catch (error) {
        console.error('Error in getVideogameByName:', error);
        return [];
    }
};


module.exports = { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName };
