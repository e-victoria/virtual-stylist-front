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
  @ViewChild('image')
  private content: ElementRef;
  private imageWrappers: NodeListOf<HTMLElement>;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  items = ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg'];
  activeItem = 0;
  totalItems;

  ngAfterViewInit(): void {
    this.imageWrappers = document.querySelectorAll('.image-wrapper');
    this.imageWrappers[this.activeItem].classList.add('show-flex');
    this.totalItems = document.querySelectorAll('.image-wrapper').length - 1;
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

