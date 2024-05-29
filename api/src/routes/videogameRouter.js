const {Router} = require("express");

const {getDetailHandler, getVideogameHandler, createVideogameHandler, getNameHandler} = require("../Handlers/videogameHandlers")

const videogameRouter = Router();

videogameRouter.get("/", getVideogameHandler);

videogameRouter.get("/:id", getDetailHandler);

videogameRouter.post("/", createVideogameHandler);

module.exports = videogameRouter;