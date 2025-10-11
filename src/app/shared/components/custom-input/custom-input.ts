import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  type = input.required<string>();
  placeHolder = input.required<string>();
  errorMessage = input.required<string>();
}
