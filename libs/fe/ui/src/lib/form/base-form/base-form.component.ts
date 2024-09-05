// Done
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Properties } from 'csstype';
import { CommonModule } from '@angular/common';

import { FlexComponent } from '../../layout/flex/flex.component';
import {
  BaseFormModel,
  ControlType,
  ControlKindEnum,
} from './base-form.model';
import { InputComponent } from '../../control/input/input.component';
import { ButtonTextComponent } from '../../control/button-text/button-text.component';
import { ButtonIconComponent } from '../../control/button-icon/button-icon.component';
import { LinkComponent } from '../../control/link/link.component';

@Component({
  selector: 'lib-base-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexComponent,
    InputComponent,
    ButtonTextComponent,
    ButtonIconComponent,
    LinkComponent,
  ],
  templateUrl: './base-form.component.html',
})
export class BaseFormComponent implements OnInit {
  @Input({ required: true }) baseForm!: BaseFormModel;

  @Input() flexDirection: Properties['flexDirection'] = 'column';

  @Output() baseFormEvent = new EventEmitter();

  formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    this.baseForm.controls.forEach(control => {
      const { name } = control;
      if (this.formGroup.get(name)) {
        throw new Error(`Form control ${name} already exists!`);
      }
      this.formGroup.addControl(name, this.buildFormControl(control));
    });
  }

  onSubmit() {
    this.baseFormEvent.emit(this.formGroup.value);
    this.resetFormGroup();
  }

  getFormControl(name: string) {
    const formControl = this.formGroup.get(name);
    if (formControl) return formControl as FormControl;
    throw new Error(`Form control ${name} does not exists!`);
  }

  checkFormControlValidation(name: string) {
    return (
      this.getFormControl(name).invalid &&
      this.getFormControl(name).touched
    );
  }

  private buildFormControl(control: ControlType) {
    switch (control.kind) {
      case ControlKindEnum.input:
        return new FormControl(
          control.defaultValue,
          control.validators,
        );
      case ControlKindEnum.buttonText:
      case ControlKindEnum.buttonIcon:
      case ControlKindEnum.link:
        return new FormControl(false, control.validators);
      default:
        throw new Error('Unsupported control type!');
    }
  }

  private resetFormGroup() {
    this.baseForm.controls.forEach(control => {
      const { name } = control;
      this.formGroup.setControl(name, this.buildFormControl(control));
    });
  }
}
