import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemVendaClientResolve} from './item-venda-client.resolve';

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ItemVendaClientResolve
  ]
})
export class ItemVendaClientModule {
}
