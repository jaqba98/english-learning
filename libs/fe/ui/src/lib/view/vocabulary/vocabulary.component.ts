import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonTextComponent } from '../../control/button-text/button-text.component';
import { CardComponent } from '../../misc/card/card.component';
import { FlexComponent } from '../../misc/flex/flex.component';
import { RoutesMenuModel } from '../../model/routes-menu.model';

@Component({
  selector: 'lib-vocabulary',
  standalone: true,
  imports: [
    CommonModule,
    FlexComponent,
    CardComponent,
    ButtonTextComponent,
    RouterOutlet,
  ],
  templateUrl: './vocabulary.component.html',
})
export class VocabularyComponent implements OnInit {
  @Input({ required: true }) route!: string;

  options: RoutesMenuModel[] = [];

  ngOnInit() {
    this.options = [
      { value: 'Bank', link: `/vocabulary/${this.route}/bank` },
      { value: 'Quiz', link: `/vocabulary/${this.route}/quiz` },
    ];
  }
}
