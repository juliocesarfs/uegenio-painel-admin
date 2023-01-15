import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectResolve } from './tipo-produto.resolve';
import { SubjectClientService } from './tipo-produto-client.service';
import { SubjectListResolve } from './tipo-produto-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SubjectClientService,
    SubjectResolve,
    SubjectListResolve
  ]
})
export class SubjectClientModule { }
