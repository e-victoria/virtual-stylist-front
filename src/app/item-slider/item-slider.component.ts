import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import IClothesImage from '../wardrobe/models/clothesImage.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import IClothes from '../wardrobe/models/item-detail.model';
import {ClothData} from '../wardrobe/models/clothData';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-item-slider',
  templateUrl: './item-slider.component.html',
  styleUrls: [ './item-slider.component.scss' ]
})
export class ItemSliderComponent implements AfterViewInit {
  @ViewChild('previous')
  previous: ElementRef;
  @ViewChild('next')
  private next: ElementRef;
  @ViewChild('carousel')
  private carousel: ElementRef;
  @ViewChild('image')
  private content: ElementRef;
  private imageWrappers: NodeListOf<HTMLElement>;
  @Input()
  clothesList: IClothesImage[];
  @Output()
  selectedItem: EventEmitter<IClothesImage> = new EventEmitter<IClothesImage>();

  env = environment;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  activeItem = 0;
  totalItems;

  ngAfterViewInit(): void {
    console.log(this.clothesList);
    this.imageWrappers = this.carousel.nativeElement.querySelectorAll('.image-wrapper');
    this.imageWrappers[this.activeItem]?.classList.add('show-flex');
    this.totalItems = this.carousel.nativeElement.querySelectorAll('.image-wrapper').length - 1;
    this.selectedItem.emit(this.clothesList[this.activeItem]);
  }


  previousBtn() {
    this.imageWrappers[this.activeItem].classList.remove('show-flex');
    if (this.activeItem === 0) {
      this.activeItem = this.totalItems;
      this.imageWrappers[this.activeItem].classList.add('show-flex');
    } else {
      this.activeItem--;
      this.imageWrappers[this.activeItem].classList.add('show-flex');
    }
  }

  nextBtn() {
    this.imageWrappers[this.activeItem].classList.remove('show-flex');
    if (this.activeItem < this.totalItems) {
      this.activeItem++;
      this.imageWrappers[this.activeItem].classList.add('show-flex');
    } else {
      this.activeItem = 0;
      this.imageWrappers[this.activeItem].classList.add('show-flex');
      this.content.nativeElement.style.transform = `none`;
    }
  }
}

