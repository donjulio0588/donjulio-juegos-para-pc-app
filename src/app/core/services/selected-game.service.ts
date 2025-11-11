import { Injectable, signal } from '@angular/core';
import { Game } from '@app/core/models';

interface ImageDetails {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class SelectedGameService {
  private selectedGame = signal<Game | null>(null);
  private imageGallery = signal<Array<ImageDetails>>([]);
  private activeImage = signal<string | undefined>('');

  setSelectedGame(game: Game) {
    this.selectedGame.set(game);
  }

  setImageGallery(gameData: Game) {
    this.imageGallery.set([
      {
        itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameData?.image1}`,
        thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameData?.image1}`,
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameData?.image2}`,
        thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameData?.image2}`,
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameData?.image3}`,
        thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameData?.image3}`,
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameData?.image4}`,
        thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameData?.image4}`,
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
    ]);

    this.activeImage.set(
      `http://localhost:4000/api/games/images/game-images/splash1/${this.imageGallery()[0]}`
    );
  }

  getSelectedGame() {
    return this.selectedGame;
  }

  getImageGallery() {
    return this.imageGallery();
  }
}
