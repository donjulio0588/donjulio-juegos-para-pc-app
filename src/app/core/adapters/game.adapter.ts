import { Game, GameInfo } from '@app/core/models';
import { normalizeMultiplayer } from '../helpers/normalizeMultiplayer';

export const GameAdapter = (gameInfo: GameInfo): GameInfo => {
  //this is a temporary solution , the idea is to left only the image name in the data base field
  let fixedImagePosterURL = gameInfo.games.map((game) => {
    return {
      ...game,
      poster: game.poster ? game.poster.split('/').reverse()[0] : "no_poster.jpg",
      image1: game.image1 && game.image1.split('/').reverse()[0],
      image2: game.image1 && game.image2.split('/').reverse()[0],
      image3: game.image1 && game.image3.split('/').reverse()[0],
      image4: game.image1 && game.image4.split('/').reverse()[0],
      multiplayer: normalizeMultiplayer(game.multiplayer),
      version: game.version || 'Desconocido',
      size: game.size / 1024,
    };
  });

  return { ...gameInfo, games: fixedImagePosterURL };
};

export const SingleGameAdapter = (singleGameInfo: Game): Game => {
  //this is a temporary solution , the idea is to left only the image name in the data base field
  return {
    ...singleGameInfo,
    poster: (singleGameInfo.poster = singleGameInfo.poster ? singleGameInfo.poster.split('/').reverse()[0] : "no_poster.jpg"),
    image1: (singleGameInfo.image1 = singleGameInfo.image1 ? singleGameInfo.image1.split('/').reverse()[0] : "no_image.jpg"),
    image2: (singleGameInfo.image2 = singleGameInfo.image2 ? singleGameInfo.image2.split('/').reverse()[0] : "no_image.jpg"),
    image3: (singleGameInfo.image3 = singleGameInfo.image3 ? singleGameInfo.image3.split('/').reverse()[0] : "no_image.jpg"),
    image4: (singleGameInfo.image4 = singleGameInfo.image4 ? singleGameInfo.image4.split('/').reverse()[0] : "no_image.jpg"),
    multiplayer: normalizeMultiplayer(singleGameInfo.multiplayer),
    version: singleGameInfo.version || 'Desconocido',
    size: singleGameInfo.size < 1024 ? singleGameInfo.size : singleGameInfo.size / 1024,
  };
};


export const SearchResultAdapter = (searchResult: { games: Array<Game> }) => {
  //this is a temporary solution , the idea is to left only the image name in the data base field
  let fixedGamesURL = searchResult.games.map((game) => {
    return {
      ...game,
      poster: game.poster ? game.poster.split('/').reverse()[0] : "no_poster.jpg",
      image1: game.image1 && game.image1.split('/').reverse()[0],
      image2: game.image1 && game.image2.split('/').reverse()[0],
      image3: game.image1 && game.image3.split('/').reverse()[0],
      image4: game.image1 && game.image4.split('/').reverse()[0],
      multiplayer: normalizeMultiplayer(game.multiplayer),
      version: game.version || 'Desconocido',
      size: game.size / 1024,
    };
  });

  return { games: fixedGamesURL };
};
