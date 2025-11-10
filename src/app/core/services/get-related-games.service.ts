import { inject, Injectable } from '@angular/core';
import { GlobalStore } from '@app/store';

interface RelatedGames {
  id: string;
  name: string;
  image: string;
  price: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GetRelatedGames {
  //.store = inject(GlobalStore);
  protected relatedGames: Array<RelatedGames> = [];

  getRelated(relationNumber: number) {
    return;
  }
}

/* ProductService */
// {
//     id: '1000',
//     code: 'f230fh0g3',
//     name: 'Bamboo Watch',
//     description: 'Product Description',
//     image: 'bamboo-watch.jpg',
//     price: 65,
//     category: 'Accessories',
//     quantity: 24,
//     inventoryStatus: 'INSTOCK',
//     rating: 5
// },
// ...
