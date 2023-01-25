
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MensagemClientService } from './mensagem-client.service';
import { MensagemResolve } from './mensagem.resolve';
import { MensagemListResolve } from './mensagem-list.resolve';
import { MensagemTodosResolve } from './mensagemtodos.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MensagemClientService,
    MensagemResolve,
    MensagemListResolve,
    MensagemTodosResolve,
  ]
})
export class MensagemClientModule { }
