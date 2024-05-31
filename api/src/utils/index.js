const infoCleaner = (array) => {
    return array.map((element) => {
        return {
            name: element.name,
            description: element.description,
            platforms: element.platforms,
            image: element.image,
            released: element.released,
            rating: element.rating,
            created: false,
        }
    });
};

const infoCleanerGenre = (array) => {
    return array.map((element) => {
        return {
            name: element.name,
        }
    });
};


module.exports = infoCleaner, infoCleanerGenre;