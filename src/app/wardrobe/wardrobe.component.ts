import {AfterViewInit, Component, OnInit} from '@angular/core';
import IClothes from "../clothes/clothes";

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})

export class WardrobeComponent implements AfterViewInit, OnInit {

  exampleClothesList: IClothes[];

  constructor() { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe').classList.add('site-list__link--active');
  }

  ngOnInit(): void {
    this.exampleClothesList = [];
    // Example clothes list below:
    let item: IClothes = {
      color: 'red',
      clothType: 'shirt',
      size: 'M',
      imageName: 'shirt.jpg',
      code: null,
      tag: ['white'],
      brand: 'not known',
      shopLink: null,
      id: null,
      style: 'casual',
      stylizations: null
    };

    for(let i = 0; i < 8; i++) {
      this.exampleClothesList.push(item);
    }

    console.log(item.imageName)

  }

}
