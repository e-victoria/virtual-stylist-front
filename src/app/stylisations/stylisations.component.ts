import { Component, OnInit } from '@angular/core';
import IStylisation from "./stylisation.model";
import {StylisationService} from "./stylisation.service";
import {WardrobeService} from "../wardrobe/wardrobe.service";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-stylisations',
  templateUrl: './stylisations.component.html',
  styleUrls: ['./stylisations.component.scss']
})
export class StylisationsComponent implements OnInit {

  images: Map<number, string> = new Map<number, string>();
  private itemsAmountOnPage: number = 6;
  private pageNumber: number = 0;
  stylisationsList: IStylisation[];
  private isMore: boolean;
  env = environment;

  constructor(private stylisationService: StylisationService, private wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    const getData = (data) => {
      console.log(data);
      this.stylisationsList = data.content;
      this.isMore = data.last;
      this.getImages();
    }

    this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, getData);
  }

  getImages() {
    for (let item of this.stylisationsList) {

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
          this.stylisationsList.push(item);
          this.isMore = data['last'];
        }
      }

      this.stylisationService.getStylisations(this.itemsAmountOnPage, this.pageNumber, getMoreData);
    }
  }

}
