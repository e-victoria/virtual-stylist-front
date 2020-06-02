import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


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
  @ViewChild('content')
  private content: ElementRef;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  items = ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg'];
  activeItem = 0;
  totalItems;

  ngAfterViewInit(): void {
    this.totalItems = document.querySelectorAll('.clothes__img').length - 1;
  }


  previousBtn() {
    if (this.activeItem === 0) {
      this.activeItem = this.totalItems;
      this.content.nativeElement.style.transform = `translateX(-${this.totalItems * 100}%)`;
    } else {
      this.activeItem--;
      this.content.nativeElement.style.transform = `translateX(-${this.activeItem * 100}%)`;
    }
  }

  nextBtn() {
    console.log(this.activeItem);
    console.log(this.totalItems);
    if (this.activeItem < this.totalItems) {
      this.activeItem++;
      this.content.nativeElement.style.transform = `translateX(-${this.activeItem * 100}%)`;
    } else {
      this.activeItem = 0;
      this.content.nativeElement.style.transform = `none`;
    }
  }
}

