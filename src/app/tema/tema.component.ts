import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  listaTemas: any[] = ['alfa', 'beta', 'delta']
  tema: Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemaService

  ) { }

  ngOnInit() {

    if (environment.token == '') {

      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe({
      next: data => {
        this.listaTemas = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe({
      next: data => {
        console.log(this.tema, "-tema");
        console.log(data);
        this.listaTemas.push(data)
        this.tema = new Tema()
        alert('Tema cadastrado com sucesso')
      },
      error: error => {
        console.log(this.tema, "-tema");
        console.error('There was an error!', error);
      }
    })

  }

}
