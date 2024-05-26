const { Router } = require('express');
const postsRouter = require("./postsRouter");
const usersRouter = require("./usersRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/posts", postsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = mainRouter;
