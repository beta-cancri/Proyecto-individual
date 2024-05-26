const {Router} = require("express");

const postRouter = Router();

postRouter.get("/users", (req, res) => {
    res.status(200).send("Create user");
});

module.exports = postRouter;