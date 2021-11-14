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

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.baseUrl}/tema`, { headers: { 'Authorization': environment.userLogin.token } })
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${environment.baseUrl}/tema/${id}`, { headers: { 'Authorization': environment.userLogin.token } })
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${environment.baseUrl}/tema`, tema, { headers: { 'Authorization': environment.userLogin.token } })
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${environment.baseUrl}/tema`, tema, { headers: { 'Authorization': environment.userLogin.token } })
  }

  deleteTema(id: number) {
    return this.http.delete(`${environment.baseUrl}/tema/${id}`, { headers: { 'Authorization': environment.userLogin.token } })
  }
}



