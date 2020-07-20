import {Component, Input, OnInit} from '@angular/core';
import IStylisation from './models/stylisation.model';
import {StylisationService} from './stylisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stylisations',
  templateUrl: './stylisations.component.html',
  styleUrls: ['./stylisations.component.scss']
})
export class StylisationsComponent implements OnInit {

  itemsAmountOnPage = 6;
  pageNumber = 0;
  stylisationsList: IStylisation[];
  isMore: boolean;
  isPopup = false;
  @Input()
  stylisations: IStylisation[];

  constructor(private stylisationService: StylisationService, private router: Router) { }

  ngOnInit(): void {
    const getData = (data) => {
      if (data.error?.status === 401) {
        this.router.navigate(['auth']);
      }
      this.stylisationsList = data.content;
      this.isMore = data.last;
    };

    if (!this.stylisations) {
      this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, getData);
    }
  }

  closePopup(event) {
    if (event) {
      this.isPopup = false;
    }
  }

  getMoreData = (data) => {
    for (const item of data.content) {
      this.stylisationsList?.push(item);
      this.isMore = data.last;
    }
  };

  onScroll() {
    this.pageNumber++;

    if (!this.isMore) {
      this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, this.getMoreData);
    }
  }

  deleteStylisation(stylisationId) {

    const getResponse = (response) => {
      if (response.error.error === 'Forbidden') {
        this.isPopup = true;
      }
    };

    this.stylisationService.deleteStylisation(stylisationId, getResponse);
  }

}
