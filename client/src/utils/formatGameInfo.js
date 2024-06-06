export const formatGameInfo = (game) => {
  return {
    id: game.id,
    name: game.name,
    genres: Array.isArray(game.genres) ? game.genres.map(genre => genre.name).join(', ') : game.genres,
    platforms: Array.isArray(game.platforms) ? game.platforms.map(platform => platform.platform.name).join(', ') : game.platforms,
    image: game.background_image || game.image || 'https://static.javatpoint.com/fullformpages/images/ina-full-form4.png',
    rating: game.rating,
  };
};
