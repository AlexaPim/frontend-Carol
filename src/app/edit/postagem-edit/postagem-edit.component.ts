import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasComponent } from 'src/app/alertas/alertas.component';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { TemaComponent } from 'src/app/tema/tema.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    if (!environment.userLogin.token) {
      this.router.navigate(['/entrar'])
    } else {
      let id = this.route.snapshot.params['id']
      this.findPostagemById(id)
      this.getAllThemes()
    }
  }

  findPostagemById(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: data => {
        this.postagem = data
        this.tema.id = this.postagem.tema.id
        console.log(data.date);

      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  getAllThemes() {
    this.temaService.getAllTema().subscribe({
      next: data => {
        this.listaTemas = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  update() {
    this.postagem.tema = this.tema
    delete this.postagem.date

    this.postagemService.putPostagem(this.postagem).subscribe({
      next: data => {
        this.postagem = data
        this.alertas.showAlertSuccess("Postagem atualizada com sucesso!")
        this.router.navigate(["/inicio"])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
