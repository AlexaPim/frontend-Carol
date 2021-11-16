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

  postagem: Postagem = new Postagem()

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
      let id = this.route.snapshot.params['id']
      this.findPostagemById(id)
    }
  }

  findPostagemById(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: data => {
        this.postagem = data
      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger("findPostagemById fetch error")
      }
    })
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
