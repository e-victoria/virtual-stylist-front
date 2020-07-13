import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {ClothData} from './models/clothData';
import { catchError } from 'rxjs/operators';
import IClothes from './models/item-detail.model';

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

  deleteItem(id: number, callback) {
    this.http.delete((`${environment.serverLocalHost}/wardrobe/${id}`)).subscribe(
      (res) => {
        callback(res);
      },
      (error) => {
        callback(error);
      });
  }

  requestImage(imageName: string, callback): void {
    this.http.get(`${environment.serverLocalHost}/img/${imageName}`,{responseType: 'blob'})
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }

  getClothesById(id: string): Observable<IClothes> {
    return this.http.get<IClothes>(`${environment.serverLocalHost}/wardrobe/${id}`);
  }

  getClothes(itemsAmount: number, pageNumber: number): Observable<ClothData> {
    return this.http.get<ClothData>(`${environment.serverLocalHost}/wardrobe?size=${itemsAmount}&page=${pageNumber}`).pipe(
      catchError(this.errorHandler));
  }

  getClothesByBodyPart(bodyPart: string, callback) {
    this.http.get(`${environment.serverLocalHost}/wardrobe/bodyPart/${bodyPart}`)
      .subscribe(
        (res) => {
          callback(res);
        },
        error => {
          callback(error);
        }
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status);
  }
}
