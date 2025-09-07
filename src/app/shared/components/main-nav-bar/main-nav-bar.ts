// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-main-nav-bar',
//   imports: [],
//   templateUrl: './main-nav-bar.html',
//   styleUrl: './main-nav-bar.css'
// })
// export class MainNavBar {

// }

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.html',
  standalone: true,
  imports: [Menubar],
})
export class MainNavBar implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
  }
}
