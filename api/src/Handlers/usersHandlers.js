const getUsersHandler = (req, res) => {
    res.status(200).send("All the users are here");
};

const getDetailHandler = (req, res) => {
    res.status(200).send("Users details");
};

const createUserHandler = (req, res) => {
    res.status(200).send("User created");
}

module.exports = {
    getDetailHandler,
    getUsersHandler,
    createUserHandler,
};