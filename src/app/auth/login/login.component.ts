import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hasResponse: boolean = false;
  isUserDataIncorrect: boolean = false;
  isSubmitted: boolean = false;

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
    this.loginForm.get('email').setValue(this.loginForm.get('email').value.trim())
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  checkUser(event): void {
    event.preventDefault();
    this.isSubmitted = true;

    const userData: object = {
      'login': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    const getResponse = (response) => {
      this.hasResponse = true;
      this.loginService.saveToken(response.token);
      if(response.error) {
        this.isUserDataIncorrect = true;
      } else {
        this.router.navigate(['/']);
      }
    }

    if (this.loginForm.valid) {
      this.loginService.checkUser(userData, getResponse);
    }
  }
}
