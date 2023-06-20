import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '@core/models/persons';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private readonly entryPoint: string;

  constructor(private http: HttpClient) {
    this.entryPoint = `${environment.serverURI}/cities`;
  }

  all(): Observable<City[]> {
    return this.http.get<City[]>(`${this.entryPoint}`);
  }
}
