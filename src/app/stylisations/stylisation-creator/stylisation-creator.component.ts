import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothesImage from '../../wardrobe/models/clothesImage.model';
import {WardrobeService} from '../../wardrobe/wardrobe.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StylisationService} from '../stylisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stylisation-creator',
  templateUrl: './stylisation-creator.component.html',
  styleUrls: ['./stylisation-creator.component.scss']
})
export class StylisationCreatorComponent implements OnInit {

  bodyClothesList: IClothesImage[];
  topClothesList: IClothesImage[];
  bottomClothesList: IClothesImage[];
  private selectedTop: IClothesImage;
  private selectedBody: IClothesImage;
  private selectedBottom: IClothesImage;
  @ViewChild('bodySlider')
  private bodySlider: ElementRef;
  @ViewChild('topBottomSlider')
  private topBottomSlider: ElementRef;
  isSuccess: boolean = true;

  newStyleForm: FormGroup = new FormGroup({
    tag: new FormControl('')
  });

  constructor(private wardrobeService: WardrobeService, private stylisationService: StylisationService, private router: Router) { }

  ngOnInit(): void {

    const getTopClothes = (data) => {
      this.topClothesList = data;
    };

    const getBottomClothes = (data) => {
      this.bottomClothesList = data;
    };

    const getBodyClothes = (data) => {
      this.bodyClothesList = data;
    };

    this.wardrobeService.getClothesByBodyPart('CHEST', getTopClothes);
    this.wardrobeService.getClothesByBodyPart('LEGS', getBottomClothes);
    this.wardrobeService.getClothesByBodyPart('BODY', getBodyClothes);
  }

  changeSlider(event, prevBtn) {
    if (event.currentTarget.textContent === ' Dress/jumpsuits ') {
      this.bodySlider.nativeElement.classList.add('show-flex');
      this.topBottomSlider.nativeElement.classList.add('hide');
    } else {
      this.bodySlider.nativeElement.classList.remove('show-flex');
      this.topBottomSlider.nativeElement.classList.remove('hide');
    }
    event.currentTarget.classList.add('create-style__choice-btn--active');
    prevBtn.classList.remove('create-style__choice-btn--active');
}

  getSelectedBody(value) {
    this.selectedBody = value;
  }

  getSelectedTop(value) {
    this.selectedTop = value;
  }

  getSelectedBottom(value) {
    this.selectedBottom = value;
  }

  saveStyle(event) {
    event.preventDefault();
    let selectedClothes: IClothesImage[];
    if (this.bodySlider.nativeElement.classList.contains('show-flex')) {
      selectedClothes = [this.selectedBody];
    } else {
      selectedClothes = [this.selectedTop, this.selectedBottom];
    }
    const newStylisation = {
      clothes: selectedClothes,
      tag: this.newStyleForm.get('tag').value
    };
    setTimeout(() => {
      this.stylisationService.saveNewStylisation(newStylisation);
      this.isSuccess = true;
      this.router.navigate(['/stylisations']);
    }, 1000);
  }
}
