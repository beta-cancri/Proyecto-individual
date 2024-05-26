const { createVideogameDB } = require("../controllers/videogamesControllers");

const getVideogameHandler = (req, res) => {
    res.status(200).send("All the users are here");
};

const getDetailHandler = (req, res) => {
    res.status(200).send("Users details");
};

const createVideogameHandler = async (req, res) => {
    const {name, description, platforms, image, released, rating} = req.body;

    try{
        const response = await createVideogameDB(name, description, platforms, image, released, rating);
        res.status(200).json(response);
    }
    catch (error){
        res.status(400).json({error:error.message});
    }

    // res.status(200).send("Videogame created");   gives errror, should try to put it somewhere
}

const getNameHandler = (req, res) => {
    res.status(200).send("User created");
}

module.exports = {
    getDetailHandler,
    getVideogameHandler,
    createVideogameHandler,
    getNameHandler,
};