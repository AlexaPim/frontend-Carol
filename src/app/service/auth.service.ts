import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${environment.baseUrl}/usuarios/logar`, userLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.baseUrl}/usuarios/cadastrar`, usuario)
  }

  logado() {
    return environment.userLogin.token !== ''
  }

  limpaEnvironment() {
    environment.userLogin = {
      id: -1,
      nome: '',
      email: '',
      senha: '',
      token: '',
      dataNascimento: '',
      foto: '',
      tipo: ''
    }
  }

}

