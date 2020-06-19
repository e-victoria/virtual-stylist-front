import { Component, OnInit } from '@angular/core';
import IClothesImage from '../../wardrobe/models/clothesImage.model';
import {tap} from 'rxjs/operators';
import {ClothData} from '../../wardrobe/models/clothData';
import {WardrobeService} from '../../wardrobe/wardrobe.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stylisation-creator',
  templateUrl: './stylisation-creator.component.html',
  styleUrls: ['./stylisation-creator.component.scss']
})
export class StylisationCreatorComponent implements OnInit {

  topClothes: Observable<ClothData>;
  bottomClothes: IClothesImage[];
  allBodyClothes: IClothesImage[];

  constructor(private wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.getClothesByBodyPart();
  }

  getClothesByBodyPart(): void {

    const getResponse = (response) => {
      this.topClothes = response;
      console.log(response);
    };
    this.wardrobeService.getClothesByBodyPart('chest', getResponse);

    // this.wardrobeService.getClothesByBodyPart('legs')
    //   .pipe(
    //     tap((clothes: ClothData) => {
    //       this.bottomClothes = clothes.content;
    //     })
    //   );
    //
    // this.wardrobeService.getClothesByBodyPart('body')
    //   .pipe(
    //     tap((clothes: ClothData) => {
    //       this.allBodyClothes = clothes.content;
    //     })
    //   );
  }

}
