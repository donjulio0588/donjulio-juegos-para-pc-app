import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { RouterLink, RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  imports: [MainNavBar, RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

}
