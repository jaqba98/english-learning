import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventEmitterDirective } from '../../base/event-emitter.directive';
import { ControlButtonLinkModel } from '../../model/control/control-button-link.model';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../../misc/text/text.component';

@Component({
  selector: 'lib-button-link',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TextComponent],
  templateUrl: './button-link.component.html',
})
export class ButtonLinkComponent extends EventEmitterDirective<boolean> {
  @Input({ required: true }) control!: ControlButtonLinkModel;
}
