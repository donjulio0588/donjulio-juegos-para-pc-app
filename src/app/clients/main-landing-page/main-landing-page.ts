import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';

@Component({
  selector: 'app-main-landing-page',
  imports: [MainNavBar],
  templateUrl: './main-landing-page.html',
  styleUrl: './main-landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLandingPage {}
