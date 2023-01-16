import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersClassroomsClientResolve } from './teachers-classrooms-client.resolve';

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TeachersClassroomsClientResolve
  ]
})
export class ItemVendaClientModule {
}
