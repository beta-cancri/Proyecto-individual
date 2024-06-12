const { v4: uuidv4 } = require('uuid');

const infoCleaner = (array) => {
    return array.map((element) => ({
        id: element.id,
        name: element.name,
        description: element.description_raw || element.description || 'No description available',
        platforms: element.platforms ? element.platforms.map(p => p.platform.name).join(', ') : 'No platforms available',
        image: element.background_image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
        released: element.released || 'No release date available',
        rating: element.rating || 0,
        genres: element.genres && element.genres.length > 0 ? element.genres.map(genre => genre.name).join(', ') : 'No genres available',
        created: false,
    }));
};

const infoCleanerGenre = (array) => {
    return array.map((element) => ({
        id: uuidv4(),
        name: element.name,
    }));
};

module.exports = { infoCleaner, infoCleanerGenre };
