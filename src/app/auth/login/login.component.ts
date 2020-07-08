import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hasResponse = false;
  isUserDataIncorrect = false;
  isSubmitted = false;
  isSuccess = false;
  isServerError = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) { }

  get email(){
    this.loginForm.get('email').setValue(this.loginForm.get('email').value.trim());
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  checkUser(event): void {
    event.preventDefault();
    this.isSubmitted = true;

    const userData: object = {
      login: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    const getResponse = (response) => {
      this.hasResponse = true;
      if (!response.error) {
        this.isSuccess = true;
        this.loginService.saveToken(response.token);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1200);
      } else if (response?.error.error === 'Unauthorized') {
        this.isUserDataIncorrect = true;
      } else if (response.error) {
        console.log(response.error.error);
        this.isServerError = true;
        this.isUserDataIncorrect = false;
      }
    };

    if (this.loginForm.valid) {
      this.isUserDataIncorrect = false;
      this.loginService.checkUser(userData, getResponse);
    }
  }
  guestLogin(event): void {
    event.preventDefault();
    const userData: object = {
      login: 'kasia.kowalska@gmail.com',
      password: 'kasia123'
    };

    const getResponse = (response) => {
      this.hasResponse = true;
      if (!response.error) {
        this.isSuccess = true;
        this.loginService.saveToken(response.token);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1200);
      } else if (response?.error.error === 'Unauthorized') {
        this.isUserDataIncorrect = true;
      } else if (response.error) {
        this.isServerError = true;
        this.isUserDataIncorrect = false;
      }
    };
    this.loginService.checkUser(userData, getResponse);
  }
}
