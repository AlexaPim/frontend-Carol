import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (environment.userLogin.token !== '') {
      this.authService.limpaEnvironment()
    }
  }

  logado() {
    return this.authService.logado()
  }

  enviar() {
    alert('Mensagem enviada com sucesso!!')
    this.router.navigate(['/home'])
  }

}
