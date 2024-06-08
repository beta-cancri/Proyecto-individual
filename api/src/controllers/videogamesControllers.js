const axios = require('axios');
const { Videogame, Genre } = require("../db");
const URL = `https://api.rawg.io/api/games`;
const { DB_KEY } = process.env;
const { infoCleaner } = require("../utils/index");
const { Op } = require("sequelize");

const createVideogameDB = async (name, description, platforms, image, released, rating, genreIds) => {
    try {
        const existingGenres = await Genre.findAll({ attributes: ['id', 'name'] });
        const existingGenreIds = existingGenres.map(genre => genre.id);

        console.log('Existing genres in DB:', existingGenres.map(genre => ({
            id: genre.id,
            name: genre.name
        })));

        if (!genreIds.every(id => existingGenreIds.includes(id))) {
            throw new Error(`One or more genre IDs do not exist: ${genreIds.filter(id => !existingGenreIds.includes(id)).join(', ')}`);
        }

        const game = await Videogame.create({ name, description, platforms, image, released, rating });
        await game.setGenres(genreIds);

        console.log('Created game:', {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms,
            image: game.image,
            released: game.released,
            rating: game.rating,
            genres: await game.getGenres()
        });

        return game;
    } catch (error) {
        console.error('Error creating videogame:', error.message);
        throw error;
    }
};

const getVideogameById = async (id, source) => {
    try {
        const videogame = source === "api"
            ? (await axios.get(`${URL}/${id}?key=${DB_KEY}`)).data
            : await Videogame.findByPk(id, {
                include: {
                    model: Genre,
                    attributes: ["name"],
                },
            });

        if (!videogame) {
            throw new Error('Videogame not found');
        }

        return source === "api" ? infoCleaner([videogame])[0] : {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: videogame.platforms.join(', '),
            image: videogame.image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map(genre => genre.name).join(", ") || "No genres available",
        };
    } catch (error) {
        console.error('Error fetching videogame by ID:', error.message);
        throw error;
    }
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
        console.log(`Starting search for videogame: ${name}`);

        const apiUrl = `${URL}?search=${encodeURIComponent(name)}&key=${DB_KEY}`;
        console.log(`Fetching from API: ${apiUrl}`);

        let videogameApi = [];
        try {
            const apiResponse = await axios.get(apiUrl);
            videogameApi = apiResponse.data.results || [];
            console.log('API results:', videogameApi);
        } catch (apiError) {
            if (apiError.response && apiError.response.status === 404) {
                console.log('No results from API for:', name);
            } else {
                console.error('API error:', apiError.message);
                throw apiError;
            }
        }

        console.log(`Fetching from DB: ${name}`);
        const dbResults = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: {
                model: Genre,
                attributes: ["name"],
                through: { attributes: [] }
            }
        });
        console.log('Raw database results:', dbResults);

        const formattedDbResults = dbResults.map(game => ({
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms.join(', '),
            image: game.image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
            released: game.released,
            rating: game.rating,
            genres: game.genres.map(genre => genre.name).join(", ") || "No genres available",
            created: true,
        }));
        console.log('Formatted database results:', formattedDbResults);

        const combinedResults = [...infoCleaner(videogameApi), ...formattedDbResults];
        console.log('Combined results:', combinedResults);

        const exactMatches = combinedResults.filter(game => game.name.toLowerCase() === name.toLowerCase());
        console.log('Exact matches:', exactMatches);

        const approximateMatches = combinedResults.filter(game => game.name.toLowerCase() !== name.toLowerCase() && game.name.toLowerCase().includes(name.toLowerCase()));
        console.log('Approximate matches:', approximateMatches);

        const allResults = [...exactMatches, ...approximateMatches].map(game => ({
            ...game,
            image: game.image ? game.image : 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
            genres: game.genres ? game.genres : 'No genres available',
        }));

        console.log('All results:', allResults);

        const sortedResults = allResults.sort((a, b) => {
            const exactMatchA = exactMatches.includes(a);
            const exactMatchB = exactMatches.includes(b);

            if (exactMatchA && !exactMatchB) return -1;
            if (!exactMatchA && exactMatchB) return 1;
            return b.rating - a.rating;
        });

        console.log('Sorted results:', sortedResults);

        return sortedResults;
    } catch (error) {
        console.error('Error in getVideogameByName:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
        return [];
    }
};

module.exports = { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName };
