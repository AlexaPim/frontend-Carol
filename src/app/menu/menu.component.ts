import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogin = environment.userLogin
  fotoUrl: string

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.carregaUsuarioNoEnv()
  }

  sair() {
    this.router.navigate(['/home'])
    this.authService.limpaEnvironment()
  }

  carregaUsuarioNoEnv() {
    this.authService.getUserById(environment.userLogin.id).subscribe({
      next: res => {
        environment.usuario = res
        this.fotoUrl = environment.usuario.foto
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
