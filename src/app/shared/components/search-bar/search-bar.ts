import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { RouterLink, Router } from '@angular/router';
import { SearchResultData } from '@app/core/services/search-result-data.service';
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage.service';

interface SearchMethod {
  name: string;
  code: string;
}
@Component({
  selector: 'app-search-bar',
  imports: [InputTextModule, FormsModule, InputTextModule, FloatLabel, RouterLink],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  gameName: string | undefined;
  searchResultService = inject(SearchResultData);
  dataFromLocalStorage = inject(DataFromLocalStoage);
  mode: SearchMethod | undefined;
  router = inject(Router);

  onSubmit() {
    //in case the search method is not set in localStorage, set it to 'contains'
    this.mode = this.dataFromLocalStorage.getItemFromLocalStorage('searchMethod') as unknown as SearchMethod;
    if (!this.mode?.code) {
      this.dataFromLocalStorage.setItemToLocalStorage('searchMethod', JSON.stringify({ name: 'Contiene', code: 'contains' }));
      this.mode = this.dataFromLocalStorage.getItemFromLocalStorage('searchMethod') as unknown as SearchMethod;
    }

    //navigate to search results view
    this.router.navigate(["/games/search"], { queryParams: { gameName: this.gameName, mode: this.mode?.code } }).then(() => {

      //search games
      if (this.gameName) {
        // console.log(this.gameName);
        //console.log(this.mode?.code);
        this.searchResultService.searchGames();

      }
    });

  }
}
