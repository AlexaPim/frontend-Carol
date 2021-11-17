import { Postagem } from "src/app/model/Postagem";
import { Tema } from "src/app/model/Tema";
import { Usuario } from "src/app/model/Usuario";

export const environment = {
  production: true,
  baseUrl: 'https://projcarol.herokuapp.com',
  //baseUrl: 'http://localhost:8080',
  userLogin: {
    id: -1,
    nome: '',
    email: '',
    senha: '',
    token: '',
    dataNascimento: '',
    foto: '',
    tipo: ''
  },
  postagens: [new Postagem()],
  temas: [new Tema()],
  usuario: new Usuario()
};
