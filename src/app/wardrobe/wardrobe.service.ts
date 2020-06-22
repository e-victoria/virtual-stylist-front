import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {ClothData} from './models/clothData';
import IClothesImage from './models/clothesImage.model';

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {

  constructor(private http: HttpClient) {}

  getImage(imageName, callback) {

    const getImage = (image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onloadend = () => {
        callback(reader.result);
      };
    };

    this.requestImage(imageName, getImage);
  }

  requestImage(imageName: string, callback): void {
    this.http.get(`${environment.serverLocalHost}/img/${imageName}`,{responseType: 'blob'})
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }

  getClothes(itemsAmount: number, pageNumber: number): Observable<ClothData> {
    return this.http.get<ClothData>(`${environment.serverLocalHost}/wardrobe?size=${itemsAmount}&page=${pageNumber}`);
  }

  getClothesByBodyPart(bodyPart: string, callback) {
    this.http.get(`${environment.serverLocalHost}/wardrobe/bodyPart/${bodyPart}`)
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }
}
