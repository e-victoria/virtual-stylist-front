import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import NewClothes from '../wardrobe/newClothes.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateFormService {

  constructor(private http: HttpClient) {}

  getSelectOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.serverLocalHost}wardrobe/options`)
      .pipe();
  }

  saveClothes(newClothes: NewClothes, callback) {
    console.log(newClothes);
    this.http.post((`${environment.serverLocalHost}wardrobe`), newClothes).subscribe(
      (res) => {
        callback(res);
      });
  }

  postImage(image: FormData, callback) {
    this.http.post((`${environment.serverLocalHost}img`), image).subscribe(
      (res) => {
        callback(res);
      });
  }
}