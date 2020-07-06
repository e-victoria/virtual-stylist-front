import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {LoginService} from '../auth/login/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  faUser = faUser;
  faSignInAlt = faSignInAlt;
  isLoggedIn = false;
  @ViewChild('profileMenu')
  private profileMenu: ElementRef;
  @ViewChild('logo')
  private logo: ElementRef;
  @ViewChild('nav')
  private nav: ElementRef;

  constructor(private router: Router, private loginService: LoginService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['auth']);
    }
    this.router.events.subscribe((val) => {
      this.nav.nativeElement.classList.remove('show-flex');
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.logo.nativeElement.style.marginLeft = `-${this.logo.nativeElement.offsetWidth / 2}px`;
  }

  toggleMenu(event, menu: HTMLElement) {
    event.preventDefault();
    event.stopPropagation();
    menu.classList.toggle('show-flex');

    const hideMenu = (e) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove('show-flex');
        document.removeEventListener('click', hideMenu);
      }
    };

    document.addEventListener('click', hideMenu);
  }

  logOut(): void {
    this.loginService.logOut();
  }

}
