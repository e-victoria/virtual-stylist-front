import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  faUser = faUser;
  @ViewChild('profileMenu')
  private profileMenu: ElementRef;
  @ViewChild('logo')
  private logo: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.logo.nativeElement.style.marginLeft = `-${this.logo.nativeElement.offsetWidth/2}px`;
  }

  toggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    this.profileMenu.nativeElement.classList.toggle('show-flex');

    const hideMenu = (e) => {
      if (!this.profileMenu.nativeElement.contains(e.target)) {
        this.profileMenu.nativeElement.classList.remove('show-flex');
        document.removeEventListener('click', hideMenu);
      }
    }

    document.addEventListener('click', hideMenu);
  }

}
