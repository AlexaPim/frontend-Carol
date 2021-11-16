import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    if (!environment.userLogin.token) {
      this.router.navigate(['/entrar'])
    } else {
      const id: number = parseInt(this.route.snapshot.params['id'])
      this.postagem = environment.postagens.find(postagem => postagem.id === id) || new Postagem()
    }
  }

  delete() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe({
      next: () => {
        this.alertas.showAlertSuccess("Postagem apagada com sucesso!")
        this.router.navigate(["/inicio"])
      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger("Error para deletar postagem")
      }
    })
  }
}
