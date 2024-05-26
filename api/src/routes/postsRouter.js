const {Router} = require("express");
const {createPostHandler} = require("../Handlers/postsHandler");
const postRouter = Router();

postRouter.post("/", createPostHandler)

module.exports = postRouter;