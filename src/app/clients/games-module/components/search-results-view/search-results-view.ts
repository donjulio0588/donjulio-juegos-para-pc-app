import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MainNavBar } from "../../../../shared/components/main-nav-bar/main-nav-bar";
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { SearchResultData } from '@app/core/services/search-result-data.service';
import { Game } from '@app/core/models';
import { CommonModule } from '@angular/common';
import { FoundedGameCard } from "./founded-game-card/founded-game-card";
interface SortOrder {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-results-view',
  imports: [MainNavBar, Select, FormsModule, CommonModule, FoundedGameCard],
  templateUrl: './search-results-view.html',
  styleUrl: './search-results-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsView {
  sortOrder: SortOrder[] | undefined;
  selectedSortOrder: SortOrder | undefined;
  private searchResultDataService = inject(SearchResultData);
  foundedGames = computed(() => this.searchResultDataService.getSearchResult()());

  ngOnInit() {
    this.sortOrder = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.foundedGames = this.searchResultDataService.getSearchResult();
  }

  // ngOnDestroy() {
  //     this.searchResultDataService.getSearchResult().set([]);
  // }
}
