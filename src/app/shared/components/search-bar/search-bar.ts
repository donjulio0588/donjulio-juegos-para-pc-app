import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-search-bar',
  imports: [InputTextModule, FormsModule, InputTextModule, FloatLabel],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
}
