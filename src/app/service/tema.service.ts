import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.baseUrl}/tema`, this.token)
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${environment.baseUrl}/tema/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${environment.baseUrl}/tema`, tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${environment.baseUrl}/tema`, tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`${environment.baseUrl}/tema/${id}`, this.token)
  }
}



