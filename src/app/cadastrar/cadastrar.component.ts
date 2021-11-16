import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario()
  senhaParaConfirmar: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  setaSenhaParaConfirmar(event: any) {
    this.senhaParaConfirmar = event.target.value
  }

  setaTipoUsuario(event: any) {
    this.usuario.tipo = event.target.value
  }

  cadastrar() {

    if (this.usuario.senha !== this.senhaParaConfirmar) {
      alert('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.usuario).subscribe({
        next: res => {
          this.usuario = res
          this.router.navigate(['/entrar'])
          this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        },
        error: error => {
          console.error('There was an error!', error);
          this.alertas.showAlertDanger("Erro ao cadastrar o usuário")
        }
      })
    }

  }

}
