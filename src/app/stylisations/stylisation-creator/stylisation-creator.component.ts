import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothesImage from '../../wardrobe/models/clothesImage.model';
import {WardrobeService} from '../../wardrobe/wardrobe.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StylisationService} from '../stylisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stylisation-creator',
  templateUrl: './stylisation-creator.component.html',
  styleUrls: ['./stylisation-creator.component.scss']
})
export class StylisationCreatorComponent implements OnInit {

  mainItemId: string;
  itemTop: IClothesImage[];
  itemBottom: IClothesImage[];
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
  isSuccess = false;
  isServerError = false;

  newStyleForm: FormGroup = new FormGroup({
    tag: new FormControl('')
  });

  constructor(private wardrobeService: WardrobeService, private stylisationService: StylisationService, private router: Router) { }

  ngOnInit(): void {
    this.mainItemId = this.router.url.split('/').pop();
    if (!Number(this.mainItemId)) {
      this.mainItemId = undefined;
    }

    this.getMainItem();
  }

  getClothes() {
    const getTopClothes = (data) => {
      this.topClothesList = data;
    };

    const getBottomClothes = (data) => {
      this.bottomClothesList = data;
    };

    const getBodyClothes = (data) => {
      this.bodyClothesList = data;
    };

    if (!this.itemTop) {
      this.wardrobeService.getClothesByBodyPart('CHEST', getTopClothes);
    } else {
      this.stylisationService.getProposedStylisations(this.mainItemId, getBottomClothes);
    }
    if (!this.itemBottom) {
      this.wardrobeService.getClothesByBodyPart('LEGS', getBottomClothes);
    } else {
      this.stylisationService.getProposedStylisations(this.mainItemId, getTopClothes);
    }

    this.wardrobeService.getClothesByBodyPart('BODY', getBodyClothes);
  }

  getMainItem() {
    if (this.mainItemId) {
      this.wardrobeService.getClothesById(this.mainItemId).subscribe({
        next: data => {
          if (data.bodyPart === 'CHEST') {
            this.itemTop = [data];
            this.getClothes();
          } else if (data.bodyPart === 'LEGS') {
            this.itemBottom = [data];
            this.getClothes();
          }
        }
      });
    } else {
      this.getClothes();
    }
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
      console.log(this.selectedTop, this.selectedBottom);
      selectedClothes = [this.selectedTop, this.selectedBottom];
    }

    const newStylisation = {
      clothes: selectedClothes,
      tag: this.newStyleForm.get('tag').value
    };

    const getResponse = (response) => {
      if (!response?.error) {
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/stylisations']);
        }, 1000);
      }else {
        this.isSuccess = false;
        this.isServerError = true;
      }

    };

    this.stylisationService.saveNewStylisation(newStylisation, getResponse);
  }
}
