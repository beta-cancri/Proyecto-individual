const {Videogame} = require("../db");


const createVideogameDB = async (name, description, platforms, image, released, rating) => {

    return await Videogame.create({name, description, platforms, image, released, rating});

};

module.exports = {createVideogameDB};