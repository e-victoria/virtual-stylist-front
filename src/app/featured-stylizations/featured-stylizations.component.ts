import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {StylisationService} from '../stylisations/stylisation.service';
import IStylisation from '../stylisations/models/stylisation.model';

@Component({
  selector: 'app-featured-stylizations',
  templateUrl: './featured-stylizations.component.html',
  styleUrls: ['./featured-stylizations.component.scss']
})
export class FeaturedStylizationsComponent implements OnInit {

  @Input()
  items: IStylisation[];
  @ViewChild('carousel')
  private contentWrapper: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    center: true,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      940: {
        items: 3
      }
    },
    nav: false
  };

  constructor() {}

  ngOnInit(): void {
  }

}
