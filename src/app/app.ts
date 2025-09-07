import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainNavBar } from './shared/components/main-nav-bar/main-nav-bar';
import { Carrousel } from './shared/components/carrousel/carrousel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavBar, Carrousel],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('frontend');
}
