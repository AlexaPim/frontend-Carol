import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe({
      next: res => {
        environment.userLogin = res
        this.router.navigate(['/inicio'])
      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger("Os dados estão incorretos!")
      }
    })
  }
}


