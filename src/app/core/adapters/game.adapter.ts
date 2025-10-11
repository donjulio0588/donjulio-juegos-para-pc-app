import { Game, GameInfo } from '@app/core/models';

export const GameAdapter = (gameInfo: GameInfo): Game[] => {
  return gameInfo.results;
};
