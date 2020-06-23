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

  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.subscribe((val) => {
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.logo.nativeElement.style.marginLeft = `-${this.logo.nativeElement.offsetWidth / 2}px`;
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
    };

    document.addEventListener('click', hideMenu);
  }

  logOut(): void {
    this.loginService.logOut();
  }

}
