import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import IClothesImage from '../wardrobe/models/clothesImage.model';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-item-slider',
  templateUrl: './item-slider.component.html',
  styleUrls: [ './item-slider.component.scss' ]
})
export class ItemSliderComponent implements AfterViewInit, AfterContentChecked {

  @ViewChild('previous')
  previous: ElementRef;
  @ViewChild('next')
  private next: ElementRef;
  @ViewChild('carousel')
  private carousel: ElementRef;
  @ViewChildren('image')
  private content: QueryList<ElementRef>;
  @Input()
  clothesList: IClothesImage[];
  @Output()
  selectedItem: EventEmitter<IClothesImage> = new EventEmitter<IClothesImage>();

  env = environment;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  activeItem = 0;

  ngAfterViewInit(): void {
    this.content.toArray()[this.activeItem].nativeElement?.classList.add('show-flex');
    this.selectedItem.emit(this.clothesList[this.activeItem]);
  }

  ngAfterContentChecked(): void {
    this.content?.toArray()[this.activeItem]?.nativeElement?.classList.add('show-flex');
  }


  previousBtn() {
    this.content.toArray()[this.activeItem]?.nativeElement.classList.remove('show-flex');
    if (this.activeItem === 0) {
      this.activeItem = this.content?.toArray().length - 1;
      this.content.toArray()[this.activeItem]?.nativeElement.classList.add('show-flex');
    } else {
      this.activeItem--;
      this.content.toArray()[this.activeItem]?.nativeElement.classList.add('show-flex');
    }
    this.selectedItem.emit(this.clothesList[this.activeItem]);
  }

  nextBtn() {
    this.content.toArray()[this.activeItem]?.nativeElement.classList.remove('show-flex');
    if (this.activeItem < this.content?.toArray().length - 1) {
      this.activeItem++;
      this.content.toArray()[this.activeItem]?.nativeElement.classList.add('show-flex');
    } else {
      console.log('else')
      this.activeItem = 0;
      this.content.toArray()[this.activeItem]?.nativeElement.classList.add('show-flex');
    }
    this.selectedItem.emit(this.clothesList[this.activeItem]);
  }
}

