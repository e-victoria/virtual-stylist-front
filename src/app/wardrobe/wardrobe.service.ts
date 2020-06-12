import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {strict} from "assert";

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {

  constructor(private http: HttpClient) {}

  getItems(itemsAmount: number, pageNumber: number, callback): void {
    this.http.get<object[]>(`${environment.serverLocalHost}/wardrobe?pageSize=${itemsAmount}&pageNo=${pageNumber}`)
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }

  getImage(imageName, callback) {

    const getImage = (image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onloadend = function() {
        callback(reader.result);
      }
    }

    this.requestImage(imageName, getImage);
  }

  requestImage(imageName: string, callback):void {
    this.http.get(`${environment.serverLocalHost}/img/${imageName}`,{responseType: 'blob'})
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }
}
