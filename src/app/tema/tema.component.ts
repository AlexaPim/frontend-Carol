import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  listaTemas: Tema[] = environment.temas
  tema: Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    if (environment.userLogin.token == '') {
      this.router.navigate(['/entrar'])
    }
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe({
      next: data => {
        this.listaTemas.push(data)
        this.tema = new Tema()
        this.alertas.showAlertSuccess('Tema cadastrado com sucesso')
      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger('Houve um erro ao cadastrar o tema')
      }
    })

  }

}
