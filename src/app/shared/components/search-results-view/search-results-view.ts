import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MainNavBar } from "../main-nav-bar/main-nav-bar";
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { SearchResultData } from '@app/core/services/search-result-data.service';
import { Game } from '@app/core/models';
import { CommonModule } from '@angular/common';
interface SortOrder {
    name: string;
    code: string;
}

@Component({
  selector: 'app-search-results-view',
  imports: [MainNavBar, Select, FormsModule, CommonModule],
  templateUrl: './search-results-view.html',
  styleUrl: './search-results-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsView {
  sortOrder: SortOrder[] | undefined;
  selectedSortOrder: SortOrder | undefined;
  searchResultDataService = inject(SearchResultData);
  foundedGames = this.searchResultDataService.getSearchResult();

    ngOnInit() {
        this.sortOrder = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.foundedGames = this.searchResultDataService.getSearchResult();
       // console.log(this.foundedGames);
    }

    // ngOnDestroy() {
    //     this.searchResultDataService.getSearchResult().set([]);
    // }
}
