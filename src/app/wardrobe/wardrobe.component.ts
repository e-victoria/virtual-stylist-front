import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import IClothes from "../clothes/clothes";

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})

export class WardrobeComponent implements AfterViewInit, OnInit {

  exampleClothesList: IClothes[];
  @ViewChild('form')
  private form: ElementRef;

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

  openForm(event) {
    event.preventDefault();
    this.form.nativeElement.classList.add('show-flex');
  }

  closePopUp(event) {
    if(event === 'close') {
      this.form.nativeElement.classList.remove('show-flex');
    }
  }

}
