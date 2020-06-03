import { Component, OnInit } from '@angular/core';
import IClothes from './item-detail.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {ItemDetailService} from "./item-details.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateFormService} from "../create-form/create-form.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss', './wardrobe.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: IClothes;
  faPen = faPen;
  isSubmitted: boolean = false;
  sizeOptions: string[];
  colorOptions: string[];
  clothTypeOptions: string[];

  editForm: FormGroup = new FormGroup({
    clothType: new FormControl('', [
      Validators.required
    ]),
    size: new FormControl(''),
    color: new FormControl('', [
      Validators.required
    ]),
    brand: new FormControl(''),
    shopLink: new FormControl(''),
    tag: new FormControl(''),
    code: new FormControl('')
  });

  constructor(private itemDetailService: ItemDetailService, private router: Router, private createFormService: CreateFormService) { }

  ngOnInit(): void {
    const itemId = this.router.url.split('/').pop();
    this.getItemData(itemId);
    this.getSelectOptions();
  }

  get clothType() {
    return this.editForm.get('clothType');
  }

  get color(){
    return this.editForm.get('color');
  }

  getSelectValue(event) {
    const selectedValue = event[0];
    const inputName = event[1];
    this.editForm.get(inputName).setValue(selectedValue.toString().toUpperCase());
  }

  getItemData(id: string) {
    this.itemDetailService.getItemData(id).subscribe({
      next: data => {
        this.item = data;
      }
    });
  }

  activateEditMode(event){
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.parentNode.querySelector('.item__details-content');
    const label = event.currentTarget.parentNode.querySelector('.item-details__label');
    label.classList.toggle('hide');
    event.currentTarget.parentNode.querySelector('.item-details__select').classList.toggle('show-flex');
    input.removeAttribute('disabled');
    input.classList.add('item__details-content--active');
  }

  getSelectOptions() {
    this.createFormService.getSelectOptions().subscribe({
      next: options => {
        this.sizeOptions = options['Size'];
        this.colorOptions = options['Color'];
        this.clothTypeOptions = options['ClothType'];
      }
    });
  }

  saveChanges(event) {
    event.preventDefault();

    this.isSubmitted = true;
  }
}
