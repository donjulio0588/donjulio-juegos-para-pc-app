import { Game, GameInfo } from '@app/core/models';

export const GameAdapter = (gameInfo: GameInfo): GameInfo => {
  //const { games } = gameInfo;
  //console.log(gameInfo);
  //this is a temporary solution , the idea is to left only the image name in the data base field
  let fixedImagePosterURL = gameInfo.games.map((game) => {
    return {
      ...game,
      poster: (game.poster = game.poster.split('/').reverse()[0]),
      image1: (game.image1 = game.image1.split('/').reverse()[0]),
      image2: (game.image1 = game.image2.split('/').reverse()[0]),
      image3: (game.image1 = game.image3.split('/').reverse()[0]),
      image4: (game.image1 = game.image4.split('/').reverse()[0]),
    };
  });
  //console.log({ ...gameInfo, games: fixedImagePosterURL });

  return { ...gameInfo, games: fixedImagePosterURL };
};
