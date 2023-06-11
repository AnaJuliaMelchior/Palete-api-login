/*data transfer object. interface que definimos dentro dela
o que vai ser trasnferido do frontend para o backend*/

//para parametros opcionais inserir ? apos ex nome?
export interface UsuarioCadastrarDto{
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    //atualizar DTO sempre que inserir dados na tabela, alterar algum objeto
    //atualizar tambem o usuario service
}