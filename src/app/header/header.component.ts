import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  faUser = faUser;
  @ViewChild('logo')
  private logo: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.logo.nativeElement.style.marginLeft = `-${this.logo.nativeElement.offsetWidth/2}px`;
  }

}
