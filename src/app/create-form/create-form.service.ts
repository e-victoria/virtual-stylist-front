import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import NewClothes from '../wardrobe/models/newClothes.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateFormService {

  constructor(private http: HttpClient) {}

  getSelectOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.serverLocalHost}/wardrobe/options`)
      .pipe();
  }

  saveClothes(newClothes: NewClothes, callback) {
    this.http.post((`${environment.serverLocalHost}/wardrobe`), newClothes).subscribe(
      (res) => {
        console.log(res);
        callback(res);
      });
  }

  postImage(image: FormData, callback) {
    this.http.post((`${environment.serverLocalHost}/img`), image).subscribe(
      (res) => {
        console.log(res);
        callback(res);
      });
  }

}
