import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MainNavBar } from "@app//shared/components/main-nav-bar/main-nav-bar";
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { SearchResultData } from '@app/core/services/search-result-data.service';
import { CommonModule } from '@angular/common';
import { FoundedGameCard } from "./founded-game-card/founded-game-card";
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { Slider } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { Divider } from 'primeng/divider';
import { Checkbox } from 'primeng/checkbox';


interface SortOrder {
  name: string;
  code: string;
}

interface SearchMode {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-results-view',
  imports: [MainNavBar, Select, FormsModule, CommonModule, FoundedGameCard, SelectButton, Slider, InputTextModule, Divider, Checkbox],
  templateUrl: './search-results-view.html',
  styleUrl: './search-results-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsView implements OnInit {
  sortOrder: SortOrder[] | undefined;
  searchMethods: SortOrder[] | undefined;
  selectedSortOrder: SortOrder | undefined
  selectedMode?: SearchMode
  private searchResultDataService = inject(SearchResultData);
  localStorageService = inject(DataFromLocalStoage);
  foundedGames = this.searchResultDataService.getSearchResult();
  router = inject(Router);
  route = inject(ActivatedRoute);
  priceFilterRange: number[] = [5, 200];
  private priceFilterDebounceTimer: any;
  sizeFilterRange: number[] = [5, 300];
  private sizeFilterDebounceTimer: any;
  langValues: string[] = [];
  multiplayerValues: string[] = [];


  ngOnInit() {
    this.sortOrder = [
      { name: 'Nombre', code: 'name' },
      { name: 'Año', code: 'year' },
      { name: 'Precio', code: 'price' },
    ];
    this.searchMethods = [
      { name: 'Contiene', code: 'contains' },
      { name: 'Empieza por', code: 'startsWith' },
    ];

    this.selectedSortOrder = this.sortOrder?.[0];


    //get the search result from the service
    if (this.foundedGames()) {
      this.foundedGames = this.searchResultDataService.getSearchResult();
    }

    this.updateUI();
  }


  changeMode() {
    this.localStorageService.setItemToLocalStorage('searchMethod', JSON.stringify(this.selectedMode));

    //update the url with the new search method
    this.router.navigate(["/games/search"], { queryParams: { mode: this.selectedMode?.code }, queryParamsHandling: 'merge' }).then(() => {

      //execute que search again after change the method
      this.searchResultDataService.searchGames()
    });

  }

  changeOrder() {
    this.localStorageService.setItemToLocalStorage('searchOrder', JSON.stringify(this.selectedSortOrder));

    //update the url with the new search method
    this.router.navigate(["/games/search"], { queryParams: { orderBy: this.selectedSortOrder?.code }, queryParamsHandling: 'merge' }).then(() => {

      //execute que search again after change the method
      this.searchResultDataService.searchGames()
    });

  }


  updateUI() {
    //get the search method from localStorage to update the UI
    this.selectedMode = this.localStorageService.getItemFromLocalStorage('searchMethod') as unknown as SearchMode;
    if (!this.selectedMode?.code) {
      this.searchMethods && this.localStorageService.setItemToLocalStorage('searchMethod', JSON.stringify(this.searchMethods[0]));
      this.selectedMode = this.localStorageService.getItemFromLocalStorage('searchMethod') as unknown as SearchMode;
    }

    //update price filter component UI from the url
    this.priceFilterRange = [Number(this.route.snapshot.queryParamMap.get('startingPrice')) || 5, Number(this.route.snapshot.queryParamMap.get('endingPrice')) || 200];

    //update size filter component UI from the url
    this.sizeFilterRange = [Number(this.route.snapshot.queryParamMap.get('startingSize')) || 5, Number(this.route.snapshot.queryParamMap.get('endingSize')) || 300];

    //update sort order component UI from the url
    this.selectedSortOrder = this.sortOrder?.find((order) => order.code === this.route.snapshot.queryParamMap.get('orderBy'));

  }

  changePriceFilter() {
    // Cancelar el timer anterior si existe (debouncing)
    clearTimeout(this.priceFilterDebounceTimer);

    // Crear un nuevo timer
    this.priceFilterDebounceTimer = setTimeout(() => {
      //console.log(this.priceFilterRange);
      this.router.navigate(["/games/search"], {
        queryParams: { startingPrice: this.priceFilterRange[0], endingPrice: this.priceFilterRange[1] },
        queryParamsHandling: 'merge'
      }).then(() => {
        this.searchResultDataService.searchGames();
      });
    }, 500);
  }

  changeSizeFilter() {
    // Cancelar el timer anterior si existe (debouncing)
    clearTimeout(this.sizeFilterDebounceTimer);

    // Crear un nuevo timer
    this.sizeFilterDebounceTimer = setTimeout(() => {
      this.router.navigate(["/games/search"], {
        queryParams: { startingSize: this.sizeFilterRange[0], endingSize: this.sizeFilterRange[1] },
        queryParamsHandling: 'merge'
      }).then(() => {
        this.searchResultDataService.searchGames();
      });
    }, 500);
  }

  changeLanguageFilter() {
    this.router.navigate(["/games/search"], {
      queryParams: { language: this.langValues },
      queryParamsHandling: 'merge'
    }).then(() => {
      //console.log(this.langValues);
      this.searchResultDataService.searchGames();
    });
  }

  changeMultiplayerFilter() {
    this.router.navigate(["/games/search"], {
      queryParams: { multiplayer: this.multiplayerValues },
      queryParamsHandling: 'merge'
    }).then(() => {
      //console.log(this.multiplayerValues);
      this.searchResultDataService.searchGames();
    });
  }

}
