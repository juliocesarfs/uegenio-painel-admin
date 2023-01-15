import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayResolve } from './tipo-produto.resolve';
import { HolidayClientService } from './tipo-produto-client.service';
import { HolidayListResolve } from './tipo-produto-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HolidayClientService,
    HolidayResolve,
    HolidayListResolve
  ]
})
export class HolidayClientModule { }
