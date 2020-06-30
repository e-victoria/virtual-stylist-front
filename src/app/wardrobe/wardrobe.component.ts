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

  private pageNumber = 0;
  private itemsAmountOnPage = 8;
  clothesData$: Observable<ClothData>;
  @ViewChild('form')
  private form: ElementRef;
  private isLastPage = false;
  env = environment;

  constructor(private wardrobeService: WardrobeService) { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe').classList.add('site-list__link--active');
  }

  ngOnInit(): void {
    this.clothesData$ = this.wardrobeService.getClothes(this.itemsAmountOnPage, this.pageNumber++)
      .pipe(
        tap((clothData: ClothData) => {
          this.isLastPage = clothData.last;
        })
      );
    console.log(this.clothesData$);
  }

  onScroll() {
    console.log(!this.isLastPage);
    if (!this.isLastPage) {
      this.clothesData$ = this.clothesData$
        .pipe(
          mergeMap((clothData: ClothData) => this.wardrobeService.getClothes(this.itemsAmountOnPage, ++this.pageNumber)
            .pipe(
              map((newClothData: ClothData) => {
                console.log(newClothData);
                clothData.last = newClothData.last;
                newClothData.content.forEach((content: IClothes) => clothData.content.push(content));
                return clothData;
              })
            )
          ),
          take(1)
        );
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
