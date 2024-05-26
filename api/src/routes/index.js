const { Router } = require('express');
const genreRouter = require("./genreRouter");
const videogameRouter = require("./videogameRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

mainRouter.use("/users", videogameRouter);

mainRouter.use("/posts", genreRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = mainRouter;
