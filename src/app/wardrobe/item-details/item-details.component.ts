import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothes from '../models/item-detail.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {ItemDetailService} from './item-details.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateFormService} from '../../create-form/create-form.service';
import {WardrobeService} from '../wardrobe.service';
import {StylisationService} from '../../stylisations/stylisation.service';
import IStylisation from '../../stylisations/models/stylisation.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss', '../wardrobe.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  stylisations: IStylisation[] = [];
  image: string;
  item: IClothes;
  faPen = faPen;
  isSubmitted = false;
  sizeOptions: string[];
  colorOptions: string[];
  clothTypeOptions: string[];
  styleOptions: string[];
  newInfo: IClothes;
  itemId: number;
  isSuccess = false;
  isDeleted = false;
  isServerError = false;
  isPopup = false;
  @ViewChild('hasPattern')
  private hasPattern: ElementRef;

  editForm: FormGroup = new FormGroup({
    clothType: new FormControl('', [
      Validators.required
    ]),
    size: new FormControl(''),
    color: new FormControl('', [
      Validators.required
    ]),
    style: new FormControl('', [
      Validators.required
    ]),
    hasPattern: new FormControl(''),
    brand: new FormControl(''),
    shopLink: new FormControl(''),
    tag: new FormControl(''),
    code: new FormControl('')
  });

  constructor(private itemDetailService: ItemDetailService,
              private router: Router,
              private createFormService: CreateFormService,
              private wardrobeService: WardrobeService,
              private stylisationService: StylisationService) { }

  ngOnInit(): void {
    this.itemId = Number.parseInt(this.router.url.split('/').pop());
    this.getItemData(this.itemId);
    this.getSelectOptions();
    this.getStylisations();
  }

  get clothType() {
    return this.editForm.get('clothType');
  }

  get color(){
    return this.editForm.get('color');
  }

  get style(){
    return this.editForm.get('style');
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.editForm.get(inputName).setValue(selectedValue.toString().toUpperCase());
  }

  getImage(imageName) {
    const getImage = (image) => {
      this.image = image;
    };
    this.wardrobeService.getImage(imageName, getImage);
  }

  getItemData(id: number) {
    this.itemDetailService.getItemData(id).subscribe({
      next: data => {
        if (data.hasPattern) {
          this.hasPattern.nativeElement.setAttribute('checked', true);
        }
        this.item = data;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (this.editForm.get(Object.keys(data)[i])) {
            this.editForm.get(Object.keys(data)[i]).setValue(data[Object.keys(data)[i]]);
          }
        }
        this.getImage(data.imageName);
      }
    });
  }

  closePopup(event) {
    if (event) {
      this.isPopup = false;
    }
  }

  activateEditMode(event){
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.parentNode.querySelector('.item__details-content--disabled');
    const label = event.currentTarget.parentNode.querySelector('.item-details__label');
    const select = event.currentTarget.parentNode.querySelector('.item-details__select');
    if (label && select) {
      label.classList.toggle('hide');
      select.classList.toggle('show-flex');
    }

    if (input) {
      input.removeAttribute('disabled');
      input.classList.add('item__details-content--active');
    }
  }

  getSelectOptions() {
    this.createFormService.getSelectOptions().subscribe({
      next: options => {
        this.styleOptions = options['Style'];
        this.sizeOptions = options['Size'];
        this.colorOptions = options['Color'];
        this.clothTypeOptions = options['ClothType'];
      }
    });
  }

  saveChanges(event) {
    event.preventDefault();

    console.log(this.editForm.value);

    const getResponse = (response) => {
      if (response.error.error === 'Forbidden') {
        this.isPopup = true;
      } else if (!response?.error) {
        this.isSuccess = true;
      };
    };
    this.newInfo = this.editForm.value;
    this.newInfo.id = this.itemId;
    console.log(this.editForm.value);

    this.itemDetailService.saveChanges(this.newInfo, getResponse);
    this.isSubmitted = true;
  }

  deleteClothes(clothesId: number) {
    const getResponse = (response) => {
      if (!response?.error && response) {
        this.isDeleted = true;
        setTimeout(() => {
          this.router.navigate(['wardrobe']);
        }, 1200);
      } else if (response.error.error === 'Forbidden') {
        this.isPopup = true;
      } else {
        this.isDeleted = false;
      }
    };

    this.wardrobeService.deleteItem(clothesId, getResponse);
  }

  getStylisations(): void {

    const getResponse = (data) => {
      for (const item of data) {
        const stylisation: IStylisation = {
          id: undefined,
          clothesForDisplayStylization: [item, {
            bodyPart: this.item?.bodyPart,
            id: this.itemId,
            imageName: this.item?.imageName
          }]
        };
        this.stylisations.push(stylisation);
      }
    };

    this.stylisationService.getStylisationsByItemId(this.itemId, getResponse);
  }
}
