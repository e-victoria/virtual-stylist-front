import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    window.setTimeout(() => {
      localStorage.removeItem('token');
    }, 900000)
  }

  checkUser(userData: object, callback): void {
    this.http.post((`${environment.serverLocalHost}/auth/login`), userData).subscribe(
      (res) => {
        callback(res);
      },
      (error) => {
        callback(error)
      });
  }

  logOut() {
    localStorage.removeItem('token');
    if (this.router.url !== '/') {
      this.router.navigate(['']);
    } else {
      console.log('test test');
      window.location.reload();
    }
  }
}
