import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.baseUrl}/postagem`, { headers: { 'Authorization': environment.userLogin.token } })
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.baseUrl}/postagem/${id}`, { headers: { 'Authorization': environment.userLogin.token } })
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.baseUrl}/postagem`, postagem, { headers: { 'Authorization': environment.userLogin.token } })
  }

  putPostagem(postagem: any): Observable<Postagem> {
    return this.http.put<Postagem>(`${environment.baseUrl}/postagem`, postagem, { headers: { 'Authorization': environment.userLogin.token } })
  }

  deletePostagem(id: number) {
    return this.http.delete(`${environment.baseUrl}/postagem/${id}`, { headers: { 'Authorization': environment.userLogin.token } })
  }
}
