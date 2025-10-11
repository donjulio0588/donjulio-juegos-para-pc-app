import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [InputIcon, IconField, InputTextModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {}
