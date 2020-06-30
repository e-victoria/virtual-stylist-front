import { Component, OnInit } from '@angular/core';
import IStylisation from '../stylisations/models/stylisation.model';
import {StylisationService} from '../stylisations/stylisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: IStylisation[];

  constructor(private stylisationService: StylisationService) {}

  ngOnInit(): void {

    const getData = (data) => {
      this.items = data.content;
    };

    this.stylisationService.getStylisations(6, 0, getData);
  }

}
