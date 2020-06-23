import {Component, Input, OnInit} from '@angular/core';
import IStylisation from './models/stylisation.model';
import {StylisationService} from './stylisation.service';
import {WardrobeService} from '../wardrobe/wardrobe.service';

@Component({
  selector: 'app-stylisations',
  templateUrl: './stylisations.component.html',
  styleUrls: ['./stylisations.component.scss']
})
export class StylisationsComponent implements OnInit {

  private itemsAmountOnPage = 6;
  private pageNumber = 0;
  stylisationsList: IStylisation[];
  private isMore: boolean;
  @Input()
  stylisations: IStylisation[];

  constructor(private stylisationService: StylisationService, private wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    const getData = (data) => {
      this.stylisationsList = data.content;
      this.isMore = data.last;
    };

    if (!this.stylisations) {
      this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, getData);
    }
  }

  onScroll() {
    this.pageNumber++;

    if (!this.isMore) {

      const getMoreData = (data) => {
        for (const item of data.content) {
          this.stylisationsList?.push(item);
          this.isMore = data.last;
        }
      };

      this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, getMoreData);
    }
  }

  deleteStylisation(stylisationId) {

    const getResponse = (response) => {
      console.log(response);
    };

    this.stylisationService.deleteStylisation(stylisationId, getResponse);
  }

}
