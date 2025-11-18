import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-single-game-image-gallery',
  imports: [GalleriaModule],
  templateUrl: './single-game-image-gallery.html',
  styleUrl: './single-game-image-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameImageGallery {
  private selectedGameService = inject(SelectedGameService);
  protected selectedGame = computed(() => this.selectedGameService.getSelectedGame()());
  protected imageGallery = computed(() => this.selectedGameService.getImageGallery());
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '968px',
      numVisible: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
