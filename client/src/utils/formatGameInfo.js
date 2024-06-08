import { formatReleaseDate } from "./formatReleaseDate";

export const formatGameInfo = (game) => {
  return {
    id: game.id,
    name: game.name,
    description: game.description_raw || game.description || 'No description available',
    platforms: game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'No platforms available',
    image: game.background_image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
    released: formatReleaseDate(game.released) || 'No release date available',
    rating: game.rating || 0,
    genres: game.genres && game.genres.length > 0 ? game.genres.map(genre => genre.name).join(', ') : 'No genres available',
    created: false,
  };
};

export function formatDetailInfo(game) {
  return {
    id: game.id,
    name: game.name,
    description: game.description,
    platforms: Array.isArray(game.platforms)
      ? game.platforms.join(', ')
      : typeof game.platforms === 'string'
      ? game.platforms
      : 'Unknown platforms',
    image: game.image || 'https://previews.123rf.com/images/pytyczech/pytyczech2303/pytyczech230300102/199547461-sodio-na-elemento-de-la-tabla-peri%C3%B3dica-con-nombre-s%C3%ADmbolo-n%C3%BAmero-at%C3%B3mico-y-peso-metal-alcalino.jpg',
    released: formatReleaseDate(game.released),
    rating: game.rating,
    genres: Array.isArray(game.genres)
      ? game.genres.map(genre => genre.name).join(', ')
      : typeof game.genres === 'string'
      ? game.genres
      : 'No genres available',
  };
}