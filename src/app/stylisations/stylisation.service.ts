import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import IStylisation from "./models/stylisation.model";
import NewStylisation from './models/newStylisation';
import {Observable} from 'rxjs';
import {ClothData} from '../wardrobe/models/clothData';
import IClothesBodyPart from './models/IClothesBodyPart';

@Injectable({
  providedIn: 'root'
})
export class StylisationService {

  constructor(private http: HttpClient) { }

  getStylisations(itemsAmount: number, pageNumber: number, callback) {
    this.http.get<IStylisation[]>(`${environment.serverLocalHost}/stylization?size=${itemsAmount}&page=${pageNumber}`)
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }

  saveNewStylisation(stylisation: NewStylisation, callback) {
    this.http.post((`${environment.serverLocalHost}/stylization`), stylisation).subscribe(
      (res) => {
        callback(res);
      });
  }

  getStylisationsByItemId(id: number, callback): void {
    this.http.get<IClothesBodyPart[]>(`${environment.serverLocalHost}/stylization/${id}`)
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }
}
