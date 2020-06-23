import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import User from "../../user.model";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  checkPasswords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('passwordConfirmation');

    return password === confirmPassword ? null : formGroup.get('passwordConfirmation').setErrors({'passwordNotMatch': true});
  }

  registerNewUser(userData: User, callback) {
    this.http.post((`${environment.serverLocalHost}/auth/register`), userData).subscribe(
      (res) => {
        callback(res);
      },
      (error) => {
        callback(error);
      });
  }
}
