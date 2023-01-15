import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherResolve } from './tipo-produto.resolve';
import { TeacherClientService } from './tipo-produto-client.service';
import { TeacherListResolve } from './tipo-produto-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TeacherClientService,
    TeacherResolve,
    TeacherListResolve
  ]
})
export class TeacherClientModule { }
