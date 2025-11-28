import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { RouterLink } from '@angular/router';
import { SearchResultData } from '@app/core/services/search-result-data.service';

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


  onSubmit() {
    //add functionality to allow change the mode to 'startsWith' or 'contains' storing the value int the localStorage
    if(this.gameName){
      this.searchResultService.searchGames({ gameName: this.gameName ?? '', mode: 'contains' });
    }
  }
}
