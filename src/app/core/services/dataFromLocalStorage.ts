import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataFromLocalStoage {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setItemToLocalStorage(itemName: string, itemValue: string): void | string {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(itemName, itemValue);
    } else {
      return 'localStorage is not available on the server.';
    }
    return localStorage.setItem(itemName, itemValue);
  }

  getItemFromLocalStorage(itemName: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(itemName) || '';
    } else {
      return 'localStorage is not available on the server.';
    }
  }

  //getPageNumberFromURL():Observable<number> {
  //   return this.route.params.pipe(map((params) => params['pageNumber']));
  //}
}
