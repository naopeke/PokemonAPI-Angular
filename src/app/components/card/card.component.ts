//子コンポーネント：表示用

import { Component, Input } from '@angular/core';
import { Pokemon }  from 'src/app/models/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() childCard: Pokemon;

}
