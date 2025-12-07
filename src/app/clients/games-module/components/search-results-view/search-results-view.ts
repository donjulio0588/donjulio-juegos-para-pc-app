import { ChangeDetectionStrategy, Component, inject, computed, OnInit } from '@angular/core';
import { MainNavBar } from "@app//shared/components/main-nav-bar/main-nav-bar";
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { SearchResultData } from '@app/core/services/search-result-data.service';
import { CommonModule } from '@angular/common';
import { FoundedGameCard } from "./founded-game-card/founded-game-card";
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage.service';
import { Router } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { Slider } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

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
  imports: [MainNavBar, Select, FormsModule, CommonModule, FoundedGameCard, SelectButton, Slider, InputTextModule],
  templateUrl: './search-results-view.html',
  styleUrl: './search-results-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsView implements OnInit {
  sortOrder: SortOrder[] | undefined;
  searchMethods: SortOrder[] | undefined;
  selectedSortOrder: SortOrder | undefined;
  selectedMode?: SearchMode
  private searchResultDataService = inject(SearchResultData);
  localStorageService = inject(DataFromLocalStoage);
  foundedGames = this.searchResultDataService.getSearchResult();
  router = inject(Router);
  priceFilterRange: number[] = [5, 200];
  private priceFilterDebounceTimer: any;

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

    //execute an initial search
    //this.searchResultDataService.searchGames();

    //get the search result from the service
    if (this.foundedGames()) {
      //console.log("get the search result from the service");
      this.foundedGames = this.searchResultDataService.getSearchResult();
    }

    this.updateMenuUI();
  }


  changeMethod() {
    this.localStorageService.setItemToLocalStorage('searchMethod', JSON.stringify(this.selectedMode));

    //update the url with the new search method
    this.router.navigate(["/games/search"], { queryParams: { mode: this.selectedMode?.code }, queryParamsHandling: 'merge' }).then(() => {

      //execute que search again after change the method
      //console.log("search again");
      this.searchResultDataService.searchGames()
      // this.foundedGames = this.searchResultDataService.getSearchResult();
    });

  }


  updateMenuUI() {
    //get the search method from localStorage to update the UI
    this.selectedMode = this.localStorageService.getItemFromLocalStorage('searchMethod') as unknown as SearchMode;
    if (!this.selectedMode?.code) {
      this.searchMethods && this.localStorageService.setItemToLocalStorage('searchMethod', JSON.stringify(this.searchMethods[0]));
      this.selectedMode = this.localStorageService.getItemFromLocalStorage('searchMethod') as unknown as SearchMode;
    }
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

}
