const {Router} = require("express");
const {getGenreHandler} = require("../Handlers/genreHandler");
const genreRouter = Router();

genreRouter.post("/", getGenreHandler)

module.exports = genreRouter;