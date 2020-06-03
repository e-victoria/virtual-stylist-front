import { Component, OnInit } from '@angular/core';
import IClothes from './item-detail.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss', './wardrobe.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: IClothes;
  faPen = faPen;
  constructor() { }

  ngOnInit(): void {
    this.item = {
      color: 'red',
      clothType: 'shirt',
      size: 'M',
      imageName: 'shirt.jpg',
      code: null,
      tag: ['white'],
      brand: 'not known',
      shopLink: null,
      id: 1,
      style: 'casual',
      stylizations: null
    };
  }



}
