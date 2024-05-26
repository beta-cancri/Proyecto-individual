const createPostHandler = (req, res) => {
    res.status(200).send("Create user");
};

module.exports = {createPostHandler};