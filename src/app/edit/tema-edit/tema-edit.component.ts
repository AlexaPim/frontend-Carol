import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.userLogin.token == '') {
      this.router.navigate(['/entrar'])
    } else {
      const id: number = parseInt(this.route.snapshot.params['id'])
      this.tema = environment.temas.find(tema => tema.id === id) || new Tema()
    }
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe({
      next: res => {
        this.tema = res
        this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
        this.router.navigate(['/tema'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
