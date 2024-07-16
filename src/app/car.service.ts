import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addCar(newCar: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newCar);
  }

  updateCar(model: string, updatedCar: any): Observable<any> {
    const url = `${this.apiUrl}/cars?model=${model}`;
    return this.http.put(url, updatedCar);
  }

  deleteCar(model: string): Observable<any> {
    const url = `${this.apiUrl}/cars/${model}`;
    return this.http.delete(url);
  }
}
