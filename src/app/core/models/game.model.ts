export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export enum Genres {
  'MALE' = 'Male',
  'FEMALE' = 'Female',
  'GENDERLESS' = 'Genderless',
  'UNKNOWN' = 'unknown',
}

export enum EmulatedConsoles {
  'PS1' = 'Play Station',
  'PS2' = 'Play Station 2',
  'PS3' = 'Play Station 3',
  'PS4' = 'Play Station 4',
  'NSWITCH' = 'Nintendo Switch',
}

export enum SteamValorations {
  'EXT-NEGTV' = 'Extremadamente Negativas',
  'M-NEGTV' = 'Muy Negativas',
  'NEGTV' = 'Negativas',
}

export interface GameInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  games: Game[];
}
//================================= EDIT OR REMOVE

export interface LinkedElement {
  name: string;
  link: string;
}

export interface Origin extends LinkedElement {}
export interface Location extends LinkedElement {}

//=============================================

export interface Game {
  id: string;
  name: string;
  size: number;
  genres: Genres;
  language: string;
  description: string;
  requirements: string;
  year: number;
  related: number;
  new: boolean;
  price: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  poster: string;
  points: number;
  multiplayer: string;
  version: string;
  for_kids: boolean;
  console: EmulatedConsoles;
  gift: boolean;
  game_type: string;
  recomended: boolean;
  additional_content: boolean;
  quality_game: boolean;
  known_issues: boolean;
  issue_description: string;
  steam_valoration: SteamValorations;
  inactive: boolean;
  updated: boolean;
  updatedAt: string;
  createdAt: string;
  friendly_url: string;
  calculatedInfo: {
    relatedGamesCount: number;
    relatedGamesList: Array<Game>;
  };
}

// export interface GamePlusExtraData {
//   game: Game;
//   calculatedGameInfo: {
//     totalRelatedGames: number;
//     relatedGamesList: Array<string>;
//   };
// }

export const emptyGame: Game = {
  id: '',
  name: '',
  size: 0,
  genres: Genres.MALE,
  language: '',
  description: '',
  requirements: '',
  year: 0,
  related: 0,
  new: false,
  price: 0,
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  poster: '',
  points: 0,
  multiplayer: '',
  version: '',
  for_kids: false,
  console: EmulatedConsoles.PS1,
  gift: false,
  game_type: '',
  recomended: false,
  additional_content: false,
  quality_game: false,
  known_issues: false,
  issue_description: '',
  steam_valoration: SteamValorations['EXT-NEGTV'],
  inactive: false,
  updated: false,
  updatedAt: '',
  createdAt: '',
  friendly_url: '',
  calculatedInfo: {
    relatedGamesCount: 0,
    relatedGamesList: [],
  },
};

export interface RelatedGames {
  id: string;
  name: string;
  image: string;
  price: number;
  status: boolean;
  friendly_url: string;
}

export const RelatedGamesInitialState = {
  id: '',
  name: '',
  image: '',
  price: 0,
  status: false,
  friendly_url: '',
};
