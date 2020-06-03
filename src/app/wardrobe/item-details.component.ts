import { Component, OnInit } from '@angular/core';
import IClothes from './item-detail.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {ItemDetailService} from "./item-details.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss', './wardrobe.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: IClothes;
  faPen = faPen;

  constructor(private itemDetailService: ItemDetailService, private router: Router) { }

  ngOnInit(): void {
    const itemId = this.router.url.split('/').pop();
    this.getItemData(itemId);
  }

  getItemData(id: string) {
    this.itemDetailService.getItemData(id).subscribe({
      next: data => {
        this.item = data;
      }
    });
  }

  activateEditMode(event){
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.parentNode.querySelector('.item__details-content');
    input.removeAttribute('disabled');
    input.classList.add('item__details-content--active');
  }
}
