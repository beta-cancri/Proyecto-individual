const getVideogameHandler = (req, res) => {
    res.status(200).send("All the users are here");
};

const getDetailHandler = (req, res) => {
    res.status(200).send("Users details");
};

const createVideogameHandler = (req, res) => {
    res.status(200).send("User created");
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