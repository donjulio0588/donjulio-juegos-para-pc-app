import { Game, GameInfo } from '@app/core/models';

export const GameAdapter = (gameInfo: GameInfo): GameInfo => {
  //this is a temporary solution , the idea is to left only the image name in the data base field
  let fixedImagePosterURL = gameInfo.games.map((game) => {
    return {
      ...game,
      poster: game.poster && game.poster.split('/').reverse()[0],
      image1: game.image1 && game.image1.split('/').reverse()[0],
      image2: game.image1 && game.image2.split('/').reverse()[0],
      image3: game.image1 && game.image3.split('/').reverse()[0],
      image4: game.image1 && game.image4.split('/').reverse()[0],
    };
  });

  return { ...gameInfo, games: fixedImagePosterURL };
};
export const SingleGameAdapter = (singleGameInfo: Game): Game => {
  //this is a temporary solution , the idea is to left only the image name in the data base field
  let singleGameInfoWithFixedImagePosterURL = {
    ...singleGameInfo,
    poster: (singleGameInfo.poster = singleGameInfo.poster.split('/').reverse()[0]),
    image1: (singleGameInfo.image1 = singleGameInfo.image1.split('/').reverse()[0]),
    image2: (singleGameInfo.image2 = singleGameInfo.image2.split('/').reverse()[0]),
    image3: (singleGameInfo.image3 = singleGameInfo.image3.split('/').reverse()[0]),
    image4: (singleGameInfo.image4 = singleGameInfo.image4.split('/').reverse()[0]),
    multiplayer: singleGameInfo.multiplayer || 'No',
  };

  return singleGameInfoWithFixedImagePosterURL;
};
