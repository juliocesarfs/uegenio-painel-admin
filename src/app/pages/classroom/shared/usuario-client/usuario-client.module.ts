import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomResolve } from './classroom.resolve';
import { ClassroomClientService } from './classroom-client.service';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ClassroomClientService,
    ClassroomResolve
  ]
})
export class ClassroomClientModule { }
