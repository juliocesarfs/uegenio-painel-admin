import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemesterResolve } from './tipo-produto.resolve';
import { SemesterClientService } from './tipo-produto-client.service';
import { SemesterListResolve } from './tipo-produto-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SemesterClientService,
    SemesterResolve,
    SemesterListResolve
  ]
})
export class SemesterClientModule { }
