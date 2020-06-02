import {AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';
import IClothes from '../wardrobe/item-detail.model';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-item-slider',
  templateUrl: './item-slider.component.html',
  styleUrls: [ './item-slider.component.scss' ]
})
export class ItemSliderComponent implements OnInit {
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
  totalItems = document.querySelectorAll('.carousel .content >*').length - 1;

  // ngOnInit(): void {
  //   }
  //
  // previousBtn() {
  //   console.log('test1');
  //   if (this.activeItem === 0) {
  //     console.log('test');
  //     this.activeItem = this.totalItems;
  //     this.content.nativeElement.style.transform = `translateX(-${this.totalItems * 100}%)`;
  //   } else {
  //     this.activeItem--;
  //     this.content.nativeElement.style.transform = `translateX(-${this.activeItem * 100}%)`;
  //   }
  // }
  // nextBtn(){
  //   if (this.activeItem < this.totalItems) {
  //     this.activeItem++;
  //     this.content.nativeElement.style.transform = `translateX(-${this.activeItem * 100}%)`;
  //   } else {
  //     this.activeItem = 0;
  //     this.content.nativeElement.style.transform = `none`;
  //   }
  // }
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {

      const previousButton = document.querySelector('.previous') as HTMLElement;
      const nextButton = document.querySelector('.next');
      const content = document.querySelector('.carousel .content') as HTMLElement;
      const totalItems = document.querySelectorAll('.carousel .content >*').length - 1;
      let activeItem = 0;

      previousButton.addEventListener('click', () => {
        if (activeItem === 0) {
          activeItem = totalItems;
          content.style.transform = `translateX(-${totalItems * 100}%)`;
        } else {
          activeItem--;
          content.style.transform = `translateX(-${activeItem * 100}%)`;
        }
      });

      nextButton.addEventListener('click', () => {
        if (activeItem < totalItems) {
          activeItem++;
          content.style.transform = `translateX(-${activeItem * 100}%)`;
        } else {
          activeItem = 0;
          content.style.transform = `none`;
        }
      });
    });
  }
}
  // ngOnInit(): void {

  // }

