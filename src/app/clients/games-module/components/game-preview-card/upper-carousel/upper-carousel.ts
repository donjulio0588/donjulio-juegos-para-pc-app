import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
// import { ProductService } from '@/service/productservice';
// import { Product } from '@/domain/product';
import { FetchGames } from '@app/core/services/fetch-games.service';
import { SteamValorations } from '@app/core/models';

export interface Product {
  id?: string;
  // code?: string;
  name?: string;
  description?: string;
  price?: number;
  // quantity?: number;
  inactive?: boolean;
  // category?: string;
  poster?: string;
  steam_valoration?: SteamValorations;
}

// export interface Game {
//   id: string;
//   name: string;
//   size: number;
//   genres: Genres;
//   language: string;
//   description: string;
//   requirements: string;
//   year: number;
//   related: number;
//   new: boolean;
//   price: number;
//   image1: string;
//   image2: string;
//   image3: string;
//   image4: string;
//   poster: string;
//   points: number;
//   multiplayer: string;
//   version: string;
//   for_kids: boolean;
//   console: EmulatedConsoles;
//   gift: boolean;
//   game_type: string;
//   recomended: boolean;
//   additional_content: boolean;
//   quality_game: boolean;
//   known_issues: boolean;
//   issue_description: string;
//   steam_valoration: SteamValorations;
//   inactive: boolean;
//   updated: boolean;
//   updatedAt: string;
//   createdAt: string;
//   friendly_url: string;
//   calculatedInfo: {
//     relatedGamesCount: number;
//     relatedGamesList: Array<Game>;
//   };
// }

@Component({
  //templateUrl: ,
  selector: 'app-upper-carousel',
  templateUrl: './upper-carousel.html',
  styleUrl: './upper-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonModule, CarouselModule, TagModule],
  //providers: [FetchGames]
})

export class UpperCarousel implements OnInit {
  private gameService = inject(FetchGames);
  products = signal<Product[]>([]);
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    //los juegos que se muestran en el carrousel debes entar identificados en la base ded datos
    //por ahora solo muestro los primeros 9 juegos
    //se debe crear un formulario para que el admin pueda agregar o eliminar juegos al carrousel
    this.gameService.getAllGames(50, 1).subscribe({
      next: (data) => {
        this.products.set(data.games.slice(Math.floor(Math.random() * data.games.length), Math.floor(Math.random() * data.games.length) + 9));
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.responsiveOptions = [
      {
        breakpoint: '1600px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warn';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
