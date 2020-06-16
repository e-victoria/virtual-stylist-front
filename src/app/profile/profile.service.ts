import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import IProfile from '../profile/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<IProfile> {
    return this.http.get<IProfile>(`${environment.serverLocalHost}/user/${id}`)
      .pipe();
  }


  saveChanges(newProfile: IProfile, id: number, callback) {
    console.log(newProfile);
    this.http.put((`${environment.serverLocalHost}/user/${id}`), newProfile).subscribe(
      (res) => {
        callback(res);
      });
  }

  getSelectOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.serverLocalHost}/user/options`)
      .pipe();
  }
}
