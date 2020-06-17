import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import IStylisation from "./stylisation.model";

@Injectable({
  providedIn: 'root'
})
export class StylisationService {

  constructor(private http: HttpClient) { }

  getStylisations(itemsAmount: number, pageNumber: number, callback) {
    this.http.get<IStylisation[]>(`${environment.serverLocalHost}/stylization?pageSize=${itemsAmount}&pageNo=${pageNumber}`)
      .subscribe(
        (res) => {
          callback(res);
        },
      );
  }
}
