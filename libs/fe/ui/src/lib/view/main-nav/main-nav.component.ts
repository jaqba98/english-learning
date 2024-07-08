import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent, TextComponent } from '../../misc';

@Component({
  selector: 'lib-main-nav',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TextComponent
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {}
