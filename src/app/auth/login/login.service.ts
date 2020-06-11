import { Injectable } from '@angular/core';
import User from "../../user/user.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkUser(userData: object, callback) {
    this.http.post((`${environment.serverLocalHost}/auth/login`), userData).subscribe(
      (res) => {
        callback(res);
      },
      (error) => {
        callback(error)
      });
  }
}
