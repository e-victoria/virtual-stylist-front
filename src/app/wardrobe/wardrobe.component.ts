import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothes from './models/item-detail.model';
import {WardrobeService} from './wardrobe.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ClothData} from './models/clothData';
import {map, mergeMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})

export class WardrobeComponent implements AfterViewInit, OnInit {

  images: Map<number, string> = new Map<number, string>();
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

    const getData = (data) => {
      this.clothesList = data['content'];
      this.isMore = data['last'];
      this.getImages();
    }

    this.wardrobeService.getItems(this.itemsAmountOnPage, this.pageNumber, getData);
  }

  getImages() {
    for (let item of this.clothesList) {

      const getImage = (image) => {
        this.images.set(item.id, image);
      }
      this.wardrobeService.getImage(item.imageName, getImage)
    }
  }

  onScroll() {
    this.pageNumber++;

    if (!this.isMore) {

      const getMoreData = (data) => {
        for (let item of data['content']) {
          this.clothesList.push(item);
          this.isMore = data['last'];
        }
      }

      this.wardrobeService.getItems(this.itemsAmountOnPage, this.pageNumber, getMoreData);
      console.log('scrolled!!');
    }
  }

  openForm(event) {
    event.preventDefault();
    this.form.nativeElement.classList.add('show-flex');
  }

  closePopUp(event) {
    console.log(event);
    if (event === 'close') {
      this.form.nativeElement.classList.remove('show-flex');
    }
  }

}
