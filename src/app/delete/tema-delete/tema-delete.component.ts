import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

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

  apagar() {
    this.temaService.deleteTema(this.tema.id).subscribe({
      next: () => {
        this.alertas.showAlertSuccess('Tema apagado com sucesso!')
        environment.temas = environment.temas.filter(tema => tema.id !== this.tema.id)
        this.router.navigate(['/tema'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

  }

}
