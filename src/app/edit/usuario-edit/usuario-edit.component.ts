import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = environment.usuario
  senhaParaConfirmar: string
  novaSenha: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.userLogin.token == '') {
      this.router.navigate(['/entrar'])
    }
  }

  verificaSenha() {
    return this.novaSenha === this.senhaParaConfirmar
  }

  atualizar() {
    if (!this.verificaSenha()) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')

    } else {
      this.usuario.senha = this.novaSenha
      delete this.usuario.postagens

      this.authService.atualizarUsuario(this.usuario).subscribe({
        next: () => {
          this.alertas.showAlertSuccess('Informações atualizadas com sucesso!')
          this.authService.limpaEnvironment()
          this.router.navigate(['/entrar'])
        },
        error: error => {
          console.error('There was an error!', error);
          this.alertas.showAlertDanger('Houve um erro ao atualizar o usuario')
        }
      })
    }

  }

}


