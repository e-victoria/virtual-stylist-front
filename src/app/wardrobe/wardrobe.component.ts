import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothes from './models/item-detail.model';
import {WardrobeService} from './wardrobe.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})

export class WardrobeComponent implements AfterViewInit, OnInit {

  private pageNumber = 0;
  private itemsAmountOnPage = 8;
  clothesList: IClothes[];
  @ViewChild('form')
  private form: ElementRef;
  private isLastPage = false;
  env = environment;


  constructor(private wardrobeService: WardrobeService) { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe').classList.add('site-list__link--active');
  }

  ngOnInit(): void {
    this.wardrobeService.getClothes(this.itemsAmountOnPage, this.pageNumber).subscribe({
      next: data => {
        this.clothesList = data.content;
        this.isLastPage = data.last;
      }
    });
  }

  onScroll() {
    this.pageNumber += 1;

    if (!this.isLastPage) {
      this.wardrobeService.getClothes(this.itemsAmountOnPage, this.pageNumber).subscribe({
        next: data => {
          this.clothesList = this.clothesList.concat(...data.content);
          this.isLastPage = data.last;
        }
      });
    }
  }

  openForm(event) {
    event.preventDefault();
    this.form.nativeElement.classList.add('show-flex');
    // this.modalOpen = true;
  }

  closePopUp(event) {
    if (event === 'close') {
      console.log('test234');
      this.form.nativeElement.classList.remove('show-flex');
      // this.modalOpen = false;
    }
  }

}
