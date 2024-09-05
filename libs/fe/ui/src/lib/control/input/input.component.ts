// Done
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TextComponent } from '../../misc/text/text.component';
import { TextColorType } from '../../misc/text/text.type';
import { InputType } from './input.type';
import { BaseControlService } from '../../form/base-form-control/base-control.service';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [ReactiveFormsModule, TextComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [BaseControlService.getProvider(InputComponent)],
})
export class InputComponent extends BaseControlService<string> {
  @ViewChild('input') input!: ElementRef;

  @Input({ required: true }) control!: FormControl;

  @Input() label = '';

  @Input() placeholder = '';

  @Input() type: InputType = 'text';

  textColor: TextColorType = 'text__secondary';

  onFocus() {
    this.textColor = 'text__accent';
  }

  onBlur() {
    this.textColor = 'text__secondary';
  }

  onClick() {
    this.input.nativeElement.focus();
  }
}
