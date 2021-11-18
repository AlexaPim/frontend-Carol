import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  temaPostagemId: number
  user: UserLogin = environment.userLogin
  postagem: Postagem = new Postagem()

  listaPostagens: Postagem[] = []
  listaPostagensDoUsuario: Postagem[] = []

  listaTemas: Tema[]
  temaUnico: Tema
  postagensPorTemas: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.userLogin.token === '') {
      this.router.navigate(['/entrar'])
    } else {
      this.inicializaVariaveis()
      this.getAllTemas()
      this.getAllPostagens()
    }
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe({
      next: res => {
        this.listaTemas = res
        environment.temas = res
        this.postagem.tema = this.listaTemas.find(tema => tema.id == this.temaPostagemId) || new Tema()
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe({
      next: res => {
        this.listaPostagens = res
        environment.postagens = res
        this.listaPostagensDoUsuario = res.filter(post => post.usuario.id == environment.userLogin.id)
        this.postagensPorTemas = this.listaPostagens.filter(post => post.tema.id == this.temaPostagemId)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  publicar() {
    this.postagem.tema = this.listaTemas.find(tema => tema.id == this.temaPostagemId) || new Tema()

    this.postagem.usuario = this.user

    console.log(this.postagem);

    this.postagemService.postPostagem(this.postagem).subscribe({
      next: res => {
        console.log(res);

        this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
        this.inicializaVariaveis()
        this.listaPostagens.push(res)
        this.listaPostagensDoUsuario.push(res)
        console.log(this.listaPostagensDoUsuario);

      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger("Houve um erro ao criar a postagem")
      }
    })
  }

  private inicializaVariaveis() {
    this.postagem = new Postagem()
    this.temaPostagemId = 1
  }

  escolheTema(event: any) {
    this.postagensPorTemas = this.listaPostagens.filter(post => post.tema.id == event.target.value) || []
  }
}

