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
    this.profileMenu.nativeElement.classList.toggle('show-flex');

    const closeProfileMenu = (e) => {
      if (e.target.tagName != 'BUTTON' && e.target.tagName != 'path' && e.target.tagName != 'svg') {
        this.profileMenu.nativeElement.classList.remove('show-flex');
        document.removeEventListener('click', closeProfileMenu);
      }
    }

    if (this.profileMenu.nativeElement.classList.contains('show-flex')) {
      document.addEventListener('click', closeProfileMenu);
    }
  }

}
