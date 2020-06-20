import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import IStylisation from "./stylisation.model";
import NewStylisation from './newStylisation';

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

  saveNewStylisation(stylisation: NewStylisation) {
    console.log(stylisation);
    this.http.post((`${environment.serverLocalHost}/stylization`), stylisation).subscribe(
      (res) => {
        console.log(res);
      });
  }
}
