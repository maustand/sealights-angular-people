import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '@core/models/person';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  private readonly entryPoint: string;

  constructor(private http: HttpClient) {
    this.entryPoint = `${environment.serverURI}/persons`;
  }

  all(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.entryPoint}`);
  }

  create(newPerson: Person): Observable<Person> {
    return this.http.post<Person>(`${this.entryPoint}`, newPerson);
  }
}
