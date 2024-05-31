const {Router} = require("express");
const {getGenreHandler} = require("../Handlers/genreHandler");
const genreRouter = Router();

genreRouter.get("/", getGenreHandler)

module.exports = genreRouter;