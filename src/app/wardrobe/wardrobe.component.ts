import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})
export class WardrobeComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    document.getElementById('menuWardrobe').classList.add('site-list__link--active');
  }

}
