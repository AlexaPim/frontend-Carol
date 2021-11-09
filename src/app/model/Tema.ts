import { Postagem } from "./Postagem"

export class Tema {
    public id: number
    public nome: string
    public descricao: string
    public qntd_post: number
    public relevante: number
    public postagem: Postagem
}