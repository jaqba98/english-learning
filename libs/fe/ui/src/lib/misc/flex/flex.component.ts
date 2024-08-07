import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Properties } from 'csstype';

@Component({
  selector: 'lib-flex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flex.component.html',
})
export class FlexComponent {
  @Input() flexDirection: Properties['flexDirection'] = 'row';

  @Input() alignItems: Properties['alignItems'] = 'stretch';

  @Input() justifyContent: Properties['justifyContent'] = 'stretch';

  @Input() gap: Properties['gap'] = '0';

  buildFlex(): Properties {
    return {
      display: 'flex',
      flexDirection: this.flexDirection,
      alignItems: this.alignItems,
      justifyContent: this.justifyContent,
      gap: this.gap,
    };
  }
}
