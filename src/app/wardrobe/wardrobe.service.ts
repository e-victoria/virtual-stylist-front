import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {

  constructor(private http: HttpClient) {}

  getItems(itemsAmount: number, pageNumber: number): Observable<object[]> {
    return this.http.get<object[]>(`${environment.serverLocalHost}wardrobe?pageSize=${itemsAmount}&pageNo=${pageNumber}`)
      .pipe();
  }

}
