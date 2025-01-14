import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '@core/models/country';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly entryPoint: string;

  constructor(private http: HttpClient) {
    this.entryPoint = `${environment.serverURI}/countries`;
  }

  all(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.entryPoint}`);
  }
}
