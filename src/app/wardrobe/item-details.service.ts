import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import IClothes from "./item-detail.model";

@Injectable({
  providedIn: 'root'
})

export class ItemDetailService {

  constructor(private http: HttpClient) {}

  getItemData(id: string): Observable<IClothes> {
    return this.http.get<IClothes>(`${environment.serverLocalHost}wardrobe/${id}`)
      .pipe();
  }

  //
  // saveClothes(newClothes: NewClothes, callback) {
  //   console.log(newClothes);
  //   this.http.post((`${environment.serverLocalHost}wardrobe`), newClothes).subscribe(
  //     (res) => {
  //       callback(res);
  //     });
  // }
}
