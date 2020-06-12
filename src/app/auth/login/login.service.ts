import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
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
}
