import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured-stylizations',
  templateUrl: './featured-stylizations.component.html',
  styleUrls: ['./featured-stylizations.component.scss']
})
export class FeaturedStylizationsComponent implements OnInit{

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

  items = ['path3.jpg', 'path10.jpg', 'path8.jpg', 'path9.jpg'];
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
        const totalItems = document.querySelectorAll('.carousel .content >*');
        let activeItem = 0;

        previousButton.addEventListener('click', () => {
          if (activeItem === 0) {
            activeItem = totalItems.length - 1;
            totalItems[activeItem].classList.add('transform-active');
            content.classList.add('transform-content');
          } else {
            console.log(totalItems);
            activeItem--;
            content.style.transform = `translateX(-33.3333%)`;
          }
        });

        nextButton.addEventListener('click', () => {
          if (activeItem < totalItems.length - 1) {
            activeItem++;
            totalItems[activeItem].classList.add('transform-active');
            content.classList.add('transform-content');
          } else {
            activeItem = 0;
            content.style.transform = `none`;
          }
        });
      });
  }

}
