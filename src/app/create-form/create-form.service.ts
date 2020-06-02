import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import NewClothes from '../wardrobe/newClothes.model';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CreateFormService {

  constructor(private http: HttpClient) {}

  getSelectOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.serverLocalHost}wardrobe/options`)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
      );
  }

  saveClothes(newClothes: NewClothes, callback) {
    console.log(newClothes);
    this.http.post((`${environment.serverLocalHost}wardrobe`), newClothes,).subscribe(
      (res) => {
        callback(res);
      });
  }

  postImage(image: FormData, callback) {
    this.http.post((`${environment.serverLocalHost}img`), image).subscribe(
      (res) => {
        callback(res);
      })
  }
}
