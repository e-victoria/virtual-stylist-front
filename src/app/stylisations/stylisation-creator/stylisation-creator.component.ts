import { Component, OnInit } from '@angular/core';
import IClothesImage from '../../wardrobe/models/clothesImage.model';
import {WardrobeService} from '../../wardrobe/wardrobe.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StylisationService} from '../stylisation.service';

@Component({
  selector: 'app-stylisation-creator',
  templateUrl: './stylisation-creator.component.html',
  styleUrls: ['./stylisation-creator.component.scss']
})
export class StylisationCreatorComponent implements OnInit {

  topClothesList: IClothesImage[];
  bottomClothesList: IClothesImage[];
  private selectedTop: IClothesImage;
  private selectedBottom: IClothesImage;

  newStyleForm: FormGroup = new FormGroup({
    tag: new FormControl('')
  });

  constructor(private wardrobeService: WardrobeService, private stylisationService: StylisationService) { }

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

  getSelectedTop(value) {
    this.selectedTop = value;
  }

  getSelectedBottom(value) {
    this.selectedBottom = value;
  }

  saveStyle(event) {
    event.preventDefault();
    const newStylisation = {
      clothes: [this.selectedTop, this.selectedBottom],
      tag: this.newStyleForm.get('tag').value
    };
    this.stylisationService.saveNewStylisation(newStylisation);
  }
}
