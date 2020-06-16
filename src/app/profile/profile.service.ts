import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import IProfile from '../profile/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {}

  getUserData(): Observable<IProfile> {
    return this.http.get<IProfile>(`${environment.serverLocalHost}/user/details`)
      .pipe();
  }


  saveChanges(newProfile: IProfile, callback) {
    console.log(newProfile);
    this.http.put((`${environment.serverLocalHost}/user`), newProfile).subscribe(
      (res) => {
        callback(res);
      });
  }

  getSelectOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.serverLocalHost}/user/options`)
      .pipe();
  }
}
