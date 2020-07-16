import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import IClothes from './models/item-detail.model';
import {WardrobeService} from './wardrobe.service';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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
  shouldOpen = false;


  constructor(private wardrobeService: WardrobeService, private router: Router) { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe')?.classList.add('site-list__link--active');
  }

  ngOnInit(): void {

    if (window.outerWidth > 2000) {
      this.itemsAmountOnPage = 15;
    }

    this.wardrobeService.getClothes(this.itemsAmountOnPage, this.pageNumber).subscribe(
      data => {
        this.clothesList = data.content;
        this.isLastPage = data.last;
      },
      error => {
        if (error && error === 401) {
          this.router.navigate(['auth']);
        }
      }
    );
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
    this.shouldOpen = true;
  }

  closePopUp(event) {
    if (event === 'close') {
      this.shouldOpen = false;
    }
  }

}
