import { ChangeDetectionStrategy, Component, input, inject, computed, Signal } from '@angular/core';
import { GlobalStore } from '@app/store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emptyGame } from '@app/core/models';
import { CustomInputComponent } from '@app/shared/components/custom-input/custom-input';

interface GameForm {
  name: FormControl<string>;
  image: FormControl<string>;
}

@Component({
  selector: 'app-game-add-edit',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './game-add-edit.html',
  styleUrl: './game-add-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameAddEdit {
  id = input<string>();

  readonly store = inject(GlobalStore);

  gameToEdit = computed(() => this.store.getGame(this.id() as string) ?? emptyGame);

  gameForm: Signal<FormGroup> = computed(
    () =>
      new FormGroup<GameForm>({
        name: new FormControl(this.gameToEdit().name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        image: new FormControl(this.gameToEdit().poster, {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
  );

  onSubmit(): void {
    if (this.gameForm().valid) {
      const game = {
        ...(this.id() ? { id: this.id() } : {}),
        ...this.gameForm().value,
      };
      const methodToUse = this.id() ? 'updateGame' : 'addGame';

      this.store[methodToUse](game);

      this.gameForm().reset();
    }
  }
}
