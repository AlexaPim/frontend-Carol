import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
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

  tema: Tema = new Tema()
  user: Usuario = new Usuario()
  postagem: Postagem

  listaPostagens: Postagem[]
  listaPostagensDoUsuario: Postagem[]

  listaTemas: Tema[]

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
        this.listaPostagensDoUsuario = this.listaPostagens.filter(post => post.usuario.id == environment.userLogin.id)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  publicar() {
    this.postagem.tema = this.tema

    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe({
      next: res => {
        console.log(res);
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
        this.inicializaVariaveis()
        this.listaPostagens.concat(res)
        this.listaPostagensDoUsuario.concat(res)
      },
      error: error => {
        console.error('There was an error!', error);
        this.alertas.showAlertDanger("Houve um erro ao criar a postagem")
      }
    })
  }

  private inicializaVariaveis() {
    this.postagem = new Postagem()
    this.postagem.texto = ''
    this.tema.id = 1
    this.user.id = environment.userLogin.id
  }
}

