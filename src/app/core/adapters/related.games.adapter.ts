import { Game, RelatedGames } from '../models';

export const SingleRelatedGameAdapter = (relatedInfo: Array<Game>): Array<RelatedGames> => {
  const normalizadRelatedGames = relatedInfo.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.poster ? game.poster.split('/').reverse()[0] : 'no_poster.jpg',
    price: game.price,
    status: game.inactive,
    friendly_url: game.friendly_url,
  }));

  return normalizadRelatedGames;
};
