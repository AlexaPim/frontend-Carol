import { Tema } from "./Tema"
import { Usuario } from "./Usuario"

export class Postagem {
    public id: number
    public titulo: string
    public texto: string
    public date: Date
    public curtidas: number
    public compartilhamentos: number
    public usuario: Usuario
    public tema: Tema
}