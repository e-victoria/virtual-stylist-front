import { Component, Input, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import IClothesBodyPart from '../models/IClothesBodyPart';

@Component({
  selector: 'app-stylisation-item',
  templateUrl: './stylisation-item.component.html',
  styleUrls: ['./stylisation-item.component.scss']
})
export class StylisationItemComponent implements OnInit {
  env = environment;
  sortedStylisation: IClothesBodyPart[] = [];
  dressStylisation: IClothesBodyPart;
  @Input()
  stylisation: IClothesBodyPart[];

  constructor() { }

  ngOnInit(): void {
    for (const clothes of this.stylisation) {
      if (clothes.bodyPart === 'CHEST') {
        this.sortedStylisation[0] = clothes;
      } else if (clothes.bodyPart === 'LEGS') {
        this.sortedStylisation[1] = clothes;
      } else {
        this.dressStylisation = clothes;
      }
    }
  }

}
