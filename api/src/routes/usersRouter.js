const {Router} = require("express");

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.status(200).send("All the users are here");
});

usersRouter.get("/:id", (req, res) => {
    res.status(200).send("Users details");
});

module.exports = usersRouter;