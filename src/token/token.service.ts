import { Injectable, Inject, HttpStatus, HttpException, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class  TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async save(hash: string, username: string){
    let objToken = await this.tokenRepository.findOne({})
    if (objToken){
      this.tokenRepository.update(objToken.id,{
        hash: hash
      })
    }else{
    this.tokenRepository.insert({
      hash: hash,
      username: username
      })
    }
  }  
  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOne({ })
    if (objToken){
      let usuario = await this.usuarioService.findOne(objToken.username)      
      return this.authService.login(usuario)
    }else{ //é uma requisição inválida
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}






  