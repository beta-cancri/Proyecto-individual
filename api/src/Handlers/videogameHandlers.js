const { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName} = require("../controllers/videogamesControllers");

const getVideogameHandler = async (req, res) => {
    const {name} = req.query;

    try {
        if(name){
            const videogameByName = await getVideogameByName(name)
            res.status(200).json(videogameByName);
        }else{
            const response = await getAllVideogames()
            res.status(200).json(response);
        }

        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getDetailHandler = async (req, res) => {
    const {id} = req.params;

    const source = isNaN(id) ? "bdd" : "api";

    try {
        const response = await getVideogameById(id, source);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

const createVideogameHandler = async (req, res) => {
    const {name, description, platforms, image, released, rating} = req.body;

    try{
        const response = await createVideogameDB(name, description, platforms, image, released, rating);
        res.status(200).json(response);
    }
    catch (error){
        res.status(400).json({error:error.message});
    }
}


module.exports = {
    getDetailHandler,
    getVideogameHandler,
    createVideogameHandler,
};