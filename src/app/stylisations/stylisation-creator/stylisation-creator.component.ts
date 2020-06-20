import { Component, OnInit } from '@angular/core';
import IClothesImage from '../../wardrobe/models/clothesImage.model';
import {WardrobeService} from '../../wardrobe/wardrobe.service';

@Component({
  selector: 'app-stylisation-creator',
  templateUrl: './stylisation-creator.component.html',
  styleUrls: ['./stylisation-creator.component.scss']
})
export class StylisationCreatorComponent implements OnInit {

  topClothesList: IClothesImage[];
  bottomClothesList: IClothesImage[];

  constructor(private wardrobeService: WardrobeService) { }

  ngOnInit(): void {

    const getTopClothes = (data) => {
      this.topClothesList = data;
    };

    const getBottomClothes = (data) => {
      this.bottomClothesList = data;
    };

    this.wardrobeService.getClothesByBodyPart('CHEST', getTopClothes);
    this.wardrobeService.getClothesByBodyPart('LEGS', getBottomClothes);

  }
}
