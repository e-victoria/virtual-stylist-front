import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import IClothes from '../wardrobe/item-detail.model';
import {WardrobeService} from "./wardrobe.service";

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})

export class WardrobeComponent implements AfterViewInit, OnInit {

  private pageNumber: number = 0;
  private itemsAmountOnPage: number;
  clothesList: IClothes[];
  @ViewChild('form')
  private form: ElementRef;
  private isMore: boolean;

  constructor(private wardrobeService: WardrobeService) { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe').classList.add('site-list__link--active');
  }

  ngOnInit(): void {
    this.itemsAmountOnPage = 8;
    this.clothesList = [];

    this.wardrobeService.getItems(this.itemsAmountOnPage, this.pageNumber).subscribe({
      next: data => {
        this.clothesList = data['content'];
        this.isMore = data['last'];
        console.log(data)
      }
    })

  }

  onScroll() {
    this.pageNumber++;

    if (!this.isMore) {
      this.wardrobeService.getItems(this.itemsAmountOnPage, this.pageNumber).subscribe({
        next: data => {
          for (let item of data['content']) {
            this.clothesList.push(item);
            this.isMore = data['last'];
          }
        }
      })
    }

    console.log('scrolled!!');
  }

  openForm(event) {
    event.preventDefault();
    this.form.nativeElement.classList.add('show-flex');
  }

  closePopUp(event) {
    console.log(event)
    if (event === 'close') {
      this.form.nativeElement.classList.remove('show-flex');
    }
  }

}
